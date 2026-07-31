import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProcessingStatus } from "@/components/upload/processing-status";

/** UI-only AI analysis progress route. */
export default function ProcessingPage() {
  return (
    <main>
      <Navbar />
      <section className="relative grid min-h-[calc(100vh-80px)] place-items-center overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_50%_18%,rgba(191,219,254,0.72),transparent_32%),radial-gradient(circle_at_8%_70%,rgba(219,234,254,0.5),transparent_28%)]" />
        <ProcessingStatus />
      </section>
      <Footer />
    </main>
  );
}
