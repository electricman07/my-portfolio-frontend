import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | GP Digital Web Studio" },
      {
        name: "description",
        content:
          "Our commitment to protecting your data and maintaining transparency at GP Digital Web Studio.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 animate-in fade-in duration-700">
      <article className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 shadow-xl space-y-12">
        <header className="space-y-4 border-b-2 border-slate-100 dark:border-slate-800 pb-10">
          <h4 className="text-blue-600 font-black uppercase tracking-[0.2em] text-xs">
            Legal Documentation
          </h4>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">
            Privacy Policy.
          </h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Last Updated: April 14, 2026
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-950 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-900 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-900 dark:prose-li:text-slate-300 prose-strong:text-blue-600 dark:prose-strong:text-blue-400">
          <section>
            <h2>1. Introduction</h2>
            <p>
              At <strong>GP Digital Web Studio</strong>, we are committed to
              protecting your privacy. This policy explains how we collect, use,
              and safeguard your information when you visit our website or
              engage with our design and development services.
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
                <strong>Project Data:</strong> Technical requirements and brand
                assets necessary to complete your web project.
              </li>
              <li>
                <strong>Usage Data:</strong> Non-identifying information such as
                IP address and browser type collected to improve site
                performance.
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
            <h2>4. Data Storage & Third Parties</h2>
            <p>
              We utilize trusted infrastructure providers like{" "}
              <strong>Cloudflare</strong> for hosting and{" "}
              <strong>Strapi</strong> for content management. We do not sell,
              trade, or rent your personal information to third parties for
              marketing purposes.
            </p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or request the deletion of
              your personal data at any time. If you wish to exercise these
              rights, please contact us via our official email.
            </p>
          </section>

          <section className="pt-10 border-t-2 border-slate-100 dark:border-slate-800">
            <h2 className="text-slate-950 dark:text-white">Contact Us</h2>
            <p>
              If you have any questions regarding this policy, please reach out:
            </p>
            <p className="font-black text-slate-950 dark:text-white">
              Email: hello@gpdigitalwebstudio.com <br />
              Help Center:{" "}
              <a
                href="/kb"
                className="text-blue-600 no-underline hover:underline"
              >
                /kb
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
