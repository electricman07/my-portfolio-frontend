import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../components/contacts/ContactForm";
import { ContactInfo } from "../components/contacts/ContactInfo";

export const Route = createFileRoute("/contact")({
  component: ContactComponent,
});

function ContactComponent() {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4 space-y-12 animate-in fade-in duration-700">
      {/* Page Introduction */}
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Let's Connect
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          Whether you have a question about my services, neded support,want to
          discuss a potential project, or just want to say hello, I'm here to
          help. Feel free to reach out using the contact form below or through
          any of the provided contact information. I look forward to connecting
          with you!
        </p>
      </header>

      <div className="grid lg:grid-cols-5 gap-16 items-start">
        {/* Left: Contact Form (Takes 3 columns) */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Right: Info & Socials (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-8">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
