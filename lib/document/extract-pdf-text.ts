type PdfJsModule = typeof import("pdfjs-dist/legacy/build/pdf.mjs");

type PromiseResolvers<T> = {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
};

let pdfJsPromise: Promise<PdfJsModule> | null = null;

/** Error with enough context to help a user and a developer diagnose PDF failures. */
export class PdfExtractionError extends Error {
  override name = "PdfExtractionError";
}

function ensurePromiseWithResolvers() {
  const promiseWithResolvers = Promise as PromiseConstructor & {
    withResolvers?: <T>() => PromiseResolvers<T>;
  };

  if (typeof promiseWithResolvers.withResolvers === "function") return;

  promiseWithResolvers.withResolvers = <T>() => {
    let resolve!: PromiseResolvers<T>["resolve"];
    let reject!: PromiseResolvers<T>["reject"];
    const promise = new Promise<T>((resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    });

    return { promise, resolve, reject };
  };
}

async function loadPdfJs() {
  if (typeof window === "undefined") {
    throw new PdfExtractionError("PDF text extraction is available only in a browser.");
  }

  ensurePromiseWithResolvers();

  if (!pdfJsPromise) {
    pdfJsPromise = import("pdfjs-dist/legacy/build/pdf.mjs")
      .then((pdfJs) => {
        pdfJs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        return pdfJs;
      })
      .catch((error: unknown) => {
        pdfJsPromise = null;
        throw new PdfExtractionError(`Unable to load the PDF reader: ${getErrorMessage(error)}`);
      });
  }

  return pdfJsPromise;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown PDF reader error.";
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("PDF extraction was cancelled.", "AbortError");
  }
}

/** Extracts readable text sequentially from every page of a browser-provided PDF File. */
export async function extractPdfText(file: File, signal?: AbortSignal) {
  if (file.type !== "application/pdf") {
    throw new PdfExtractionError("The selected file is not a PDF document.");
  }

  throwIfAborted(signal);
  const pdfJs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  throwIfAborted(signal);

  const loadingTask = pdfJs.getDocument({ data });
  const cancelLoadingTask = () => {
    void loadingTask.destroy();
  };
  signal?.addEventListener("abort", cancelLoadingTask, { once: true });

  let pdf: Awaited<typeof loadingTask.promise> | undefined;

  try {
    pdf = await loadingTask.promise;
    const pageText: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      throwIfAborted(signal);
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const text = textContent.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      if (text) pageText.push(text);
      page.cleanup();
    }

    const extractedText = pageText.join("\n\n").trim();
    if (!extractedText) {
      throw new PdfExtractionError("No readable text was found in this PDF.");
    }

    return extractedText;
  } catch (error) {
    if (error instanceof PdfExtractionError || error instanceof DOMException) throw error;
    throw new PdfExtractionError(`Unable to extract text from this PDF: ${getErrorMessage(error)}`);
  } finally {
    signal?.removeEventListener("abort", cancelLoadingTask);
    pdf?.cleanup();
    await loadingTask.destroy();
  }
}
