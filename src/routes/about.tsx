import { createFileRoute } from "@tanstack/react-router";
import { useAboutData } from "../hooks/useAbout";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";
import { Loader2, AlertCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const { data: aboutResponse, isLoading, isError } = useAboutData();
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (isLoading)
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );

  if (isError || !aboutResponse)
    return (
      <div className="text-center py-20 text-red-500 flex flex-col items-center gap-2">
        <AlertCircle size={40} />
        <p>Could not load profile data. Check Strapi connection.</p>
      </div>
    );

  const about = aboutResponse?.data || aboutResponse;

  const values = Array.isArray(about?.coreValues) ? about.coreValues : [];

  if (!about)
    return <div className="py-20 text-center">No profile content found.</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-24 py-12 px-6 animate-in fade-in duration-700">
      {/* 1. TOP SECTION: Image & Main Intro (2 Columns) */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-[3rem] overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900">
          {about.profileImage && (
            <img
              src={`${STRAPI_URL}${about.profileImage.url}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            About Me
          </h1>
          <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed max-w-none">
            {about?.content ? (
              <BlocksRenderer content={about.content} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>
      </section>

      {/* 2. SECONDARY TEXT SECTION: Now full width below the image/intro */}
      {about.secondaryDescription && (
        <section className="max-w-4xl mx-auto prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 text-center">
          <BlocksRenderer content={about.secondaryDescription} />
        </section>
      )}

      {/* 3. EDUCATION & EXPERIENCE: Side by Side below the text */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education Box */}
        <div className="p-10 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl">
          <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
            <span className="tracking-tighter text-blue-600">
              <FaGraduationCap />
              Education
            </span>
          </h3>
          {/* Map education items here */}
        </div>

        {/* Experience Box */}
        <div className="p-10 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] shadow-xl">
          <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
            <span className="tracking-tighter text-blue-600">
              <FaBriefcase />
              Experience
            </span>
          </h3>
          {/* Map experience items here */}
        </div>
      </section>

      {/* Stats Section */}
      {/* 4. Stats Section: Premium Card Style */}
      <section className="bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] transition-all hover:shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Years Experience */}
          <div className="space-y-3 group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
              <LucideIcons.Clock size={32} />
            </div>
            <div className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
              {about.experienceYears}+
            </div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Years of Experience
            </div>
          </div>

          {/* Job Success */}
          <div className="space-y-3 group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
              <LucideIcons.Trophy size={32} />
            </div>
            <div className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
              100%
            </div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Job Success Rate
            </div>
          </div>

          {/* Response Time */}
          <div className="space-y-3 group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-500">
              <LucideIcons.Zap size={32} />
            </div>
            <div className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
              &lt;24h
            </div>
            <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
              Response Time
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            Core Values
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            The principles that drive my workflow and ensure the highest quality
            results for every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v: any, i: number) => {
            const IconComponent =
              (LucideIcons as any)[v.iconName] || LucideIcons.HelpCircle;

            return (
              <div
                key={v.id || i}
                className="p-10 flex flex-col items-start text-left transition-all duration-500 group
                     /* 1. PREMIUM CARD STYLING */
                     bg-white dark:bg-slate-950 
                     border-2 border-slate-300 dark:border-slate-800 
                     rounded-[3rem] 
                     shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]
                     /* 2. INTERACTION */
                     hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500"
              >
                {/* Icon Container with subtle background tint */}
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-8 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-500">
                  <IconComponent
                    className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-500"
                    size={32}
                  />
                </div>

                <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-900 dark:text-white">
                  {v.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
