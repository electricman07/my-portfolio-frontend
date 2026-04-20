import { Link } from "@tanstack/react-router";
import { FaPhoneAlt } from "react-icons/fa";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
}

export function Hero({ title, subtitle, description, ctaText }: HeroProps) {
  return (
    <section className="text-center py-20 animate-in fade-in slide-in-from-bottom-5 duration-700 max-w-300 mx-auto">
      {/* Dynamic Title from Strapi 5 */}
      <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
        {title || (
          <>
            Web Designer & <br />
            <span className="text-blue-600 dark:text-blue-400">Developer</span>
          </>
        )}
      </h1>

      {/* Dynamic Subtitle from Strapi 5 */}
      <h3 className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
        {subtitle ||
          "I build high-performance, beautiful websites that help brands scale. Ready to turn your vision into a digital reality?"}
      </h3>

      <p className="mb-7.5 mx-10">{description}</p>

      {/* Call to Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/get-started"
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
        >
          {ctaText || "View My Work"}
        </Link>

        <Link
          to="/contact"
          className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-full font-bold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
        >
          <FaPhoneAlt /> Book a Call
        </Link>
      </div>
    </section>
  );
}
