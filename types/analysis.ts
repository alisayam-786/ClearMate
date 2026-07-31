/** Structured document analysis returned by the ClearMate Gemini endpoint. */
export type AnalysisResult = {
  documentType: string;
  summary: string;
  importantInformation: Array<{ label: string; value: string }>;
  actionsRequired: string[];
};

/** Ensures a response has the complete structure required by the results dashboard. */
export function isAnalysisResult(value: unknown): value is AnalysisResult {
  if (typeof value !== "object" || value === null) return false;

  const result = value as Record<string, unknown>;
  return (
    typeof result.documentType === "string" &&
    typeof result.summary === "string" &&
    Array.isArray(result.importantInformation) &&
    result.importantInformation.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Record<string, unknown>).label === "string" &&
        typeof (item as Record<string, unknown>).value === "string",
    ) &&
    Array.isArray(result.actionsRequired) &&
    result.actionsRequired.every((action) => typeof action === "string")
  );
}
