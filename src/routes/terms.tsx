import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | GP Digital Web Studio" },
      {
        name: "description",
        content:
          "The standard terms of engagement for web design and development services provided by GP Digital Web Studio.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in duration-700">
      <article className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 shadow-xl space-y-12">
        {/* HEADER */}
        <header className="space-y-4 border-b-2 border-slate-100 dark:border-slate-800 pb-10">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">
            Legal Documentation
          </h4>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">
            Terms & Conditions.
          </h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Last Updated: April 14, 2026
          </p>
        </header>

        {/* CONTENT BODY */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-950 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-900 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-900 dark:prose-li:text-slate-300 prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
          <section>
            <h2>1. Engagement & Services</h2>
            <p>
              By accessing this website or engaging{" "}
              <strong>GP Digital Designs</strong> for web design and development
              services, you agree to be bound by these terms. We provide
              professional digital solutions, including{" "}
              <strong>Full-Stack React development</strong>,{" "}
              <strong>Strapi v5 integration</strong>, and{" "}
              <strong>UX/UI design strategy</strong>.
            </p>
          </section>

          <section>
            <h2>2. Intellectual Property</h2>
            <p>Unless otherwise agreed upon in a signed project contract:</p>
            <ul>
              <li>
                <strong>Portfolio Content:</strong> All designs, code
                architectures, and case studies on this site are the sole
                property of GP Digital Designs.
              </li>
              <li>
                <strong>Client Deliverables:</strong> Upon receipt of final
                payment, intellectual property rights for custom code and
                specific design assets are transferred to the client, while we
                retain the right to showcase the work for promotional purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Project Workflow & Payments</h2>
            <p>To maintain project scheduling and quality standards:</p>
            <ul>
              <li>
                A <strong>commencement deposit</strong> is required to secure
                your slot in the development pipeline.
              </li>
              <li>
                Deployment to live environments and transfer of ownership occurs
                only after the final project balance is cleared.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Maintenance & Support</h2>
            <p>
              Post-launch support is provided through our{" "}
              <strong>Knowledge Base</strong>. While we ensure code quality at
              deployment, GP Digital Designs is not liable for issues caused by
              third-party hosting, browser updates, or client-managed content
              changes after the hand-off period.
            </p>
          </section>

          <section>
            <h2>5. Limitation of Liability</h2>
            <p>
              In no event shall <strong>GP Digital Designs</strong> be liable
              for any indirect or consequential damages arising from the use of
              our services. We provide a limited warranty period for bug fixes
              defined within individual project agreements.
            </p>
          </section>

          <section className="pt-10 border-t-2 border-slate-100 dark:border-slate-800">
            <h2 className="text-slate-950 dark:text-white">Acceptance</h2>
            <p>
              Continued use of this site signifies your full acceptance of these
              terms. We reserve the right to modify these terms as needed to
              reflect changes in industry standards or law.
            </p>
            <p className="font-black text-slate-950 dark:text-white">
              Questions? Visit our{" "}
              <a
                href="/kb"
                className="text-blue-600 no-underline hover:underline"
              >
                Help Center
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
