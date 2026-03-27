import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in duration-700">
      {/* THE PREMIUM LEGAL CARD */}
      <article className="bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] space-y-12">
        {/* HEADER */}
        <header className="space-y-4 border-b-2 border-slate-100 dark:border-slate-800 pb-10">
          <h4 className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
            Legal Documentation
          </h4>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
            Terms & Conditions.
          </h1>
          <p className="text-sm font-black uppercase tracking-widest text-slate-400">
            Last Updated: March 26, 2026
          </p>
        </header>

        {/* CONTENT BODY */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:text-slate-900 dark:prose-headings:text-white 
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
                        prose-li:text-slate-600 dark:prose-li:text-slate-400
                        prose-strong:text-blue-600 dark:prose-strong:text-blue-400"
        >
          <section>
            <h2>1. Engagement & Services</h2>
            <p>
              By accessing this website or engaging <strong>Glen.</strong> for
              web design and development services, you agree to be bound by
              these terms. We provide custom digital solutions, including but
              not limited to <strong>React development</strong>,{" "}
              <strong>Strapi integration</strong>, and{" "}
              <strong>UI/UX design</strong>.
            </p>
          </section>

          <section>
            <h2>2. Intellectual Property</h2>
            <p>Unless otherwise agreed upon in a specific project contract:</p>
            <ul>
              <li>
                <strong>Portfolio Content:</strong> All designs, code snippets,
                and case studies on this site are the sole property of Glen.
              </li>
              <li>
                <strong>Client Projects:</strong> Upon final payment, the
                specific custom code and design assets created for a client are
                transferred to the client, while we retain the right to showcase
                the work in our portfolio.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Payment & Deposits</h2>
            <p>To ensure commitment and project scheduling:</p>
            <ul>
              <li>
                A <strong>non-refundable deposit</strong> is typically required
                before work commences.
              </li>
              <li>
                Final project files and "Go-Live" deployment will occur only
                after the remaining balance is settled in full.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Client Responsibilities</h2>
            <p>
              Project timelines are dependent on timely client feedback. We are
              not responsible for delays caused by missing content, late
              feedback, or third-party service issues (e.g., hosting or domain
              provider outages).
            </p>
          </section>

          <section>
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall <strong>Glen.</strong> be liable for any
              indirect, incidental, or consequential damages arising out of the
              use of our services or this website. We provide our services "as
              is" without a warranty of uninterrupted operation once handed over
              to the client.
            </p>
          </section>

          <section className="pt-10 border-t-2 border-slate-50 dark:border-slate-800">
            <h2>Acceptance of Terms</h2>
            <p>
              Your continued use of this site signifies your acceptance of these
              terms. We reserve the right to modify these terms at any time
              without prior notice.
            </p>
            <p className="font-black text-slate-900 dark:text-white">
              Questions? Reach out via our{" "}
              <a
                href="/support"
                className="text-blue-500 no-underline hover:underline"
              >
                Support Center
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
