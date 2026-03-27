import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
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
            Privacy Policy.
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
            <h2>1. Introduction</h2>
            <p>
              At <strong>Glen.</strong>, we are committed to protecting your
              privacy. This policy explains how we collect, use, and safeguard
              your information when you visit our website or engage with our
              design and development services.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that allows us to provide a personalized
              and efficient service:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Name, email address, and
                business details provided voluntarily via our contact form.
              </li>
              <li>
                <strong>Project Data:</strong> Branding assets and technical
                credentials necessary to complete your web project.
              </li>
              <li>
                <strong>Usage Data:</strong> Non-identifying information such as
                IP address and browser type collected to improve user
                experience.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>Your data is used strictly for professional purposes:</p>
            <ul>
              <li>To respond to inquiries and provide project quotes.</li>
              <li>To develop, test, and deploy your digital solutions.</li>
              <li>
                To manage your account and send technical maintenance alerts.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Third-Party Services</h2>
            <p>
              We utilize trusted infrastructure providers like{" "}
              <strong>Vercel</strong> for hosting and <strong>Strapi</strong>{" "}
              for content management. We do not sell or trade your personal
              information with outside parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or request the deletion of
              your personal data at any time. If you wish to exercise these
              rights, please contact us directly.
            </p>
          </section>

          <section className="pt-10 border-t-2 border-slate-50 dark:border-slate-800">
            <h2>Contact Us</h2>
            <p>
              If you have any questions regarding this policy, please reach out:
            </p>
            <p className="font-black text-slate-900 dark:text-white">
              Email: hello@yourdomain.com <br />
              Support:{" "}
              <a
                href="/support"
                className="text-blue-500 no-underline hover:underline"
              >
                /support
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
