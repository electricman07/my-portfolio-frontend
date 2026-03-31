import { createFileRoute } from "@tanstack/react-router";
import { useAboutData } from "../hooks/useAbout";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";
import { Loader2, AlertCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { fetchAboutData } from "../hooks/useStrapi";

export const Route = createFileRoute("/about")({
  loader: () => fetchAboutData(),

  head: (ctx) => {
    const about = ctx.loaderData?.data;

    return {
      meta: [
        { title: "About Glen | Full-Stack Developer & Designer" },
        {
          name: "description",
          content:
            "Learn more about my journey, technical expertise in React and Node.js, and my approach to building premium digital products.",
        },
        // Open Graph for social sharing
        { property: "og:title", content: "Meet the Developer | Glen Studio" },
        { property: "og:image", content: about?.profileImage?.url },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const response = Route.useLoaderData();
  const { isLoading, isError } = useAboutData();
  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1338";

  if (isLoading)
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );

  if (isError || !response)
    return (
      <div className="text-center py-20 text-red-500 flex flex-col items-center gap-2">
        <AlertCircle size={40} />
        <p>Could not load profile data. Check Strapi connection.</p>
      </div>
    );

  const about = response?.data;

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
        <section className="max-w-4xl mx-auto prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400">
          <BlocksRenderer content={about.secondaryDescription} />
        </section>
      )}

      {/* 3. EDUCATION & EXPERIENCE: Mapping the data */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education Box */}
        <div className="p-10 bg-[#F8FAFC] dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-[3rem] shadow-sm">
          <h3 className="text-3xl font-black mb-10 flex items-center gap-3 tracking-tighter text-blue-600">
            <FaGraduationCap size={32} />
            Education
          </h3>
          <div className="space-y-10">
            {/* Array.isArray check prevents the .map crash */}
            {Array.isArray(about.education) ? (
              about.education.map((edu: any) => (
                <div
                  key={edu.id}
                  className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
                >
                  <div className="absolute -left-2.25 top-2 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#F8FAFC] dark:border-slate-900" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                      {edu.yearRange}
                    </span>
                    <h4 className="text-xl font-black tracking-tight">
                      {edu.courseName}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                      {edu.school}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">
                No education records found or data format incorrect.
              </p>
            )}
          </div>
        </div>

        {/* Experience Box */}
        <div className="p-10 bg-[#F8FAFC] dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-[3rem] shadow-sm">
          <h3 className="text-3xl font-black mb-10 flex items-center gap-3 tracking-tighter text-blue-600">
            <FaBriefcase size={32} />
            Experience
          </h3>
          <div className="space-y-10">
            {Array.isArray(about.experience) ? (
              about.experience.map((exp: any) => (
                <div
                  key={exp.id}
                  className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800"
                >
                  <div className="absolute -left-2.25 top-2 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#F8FAFC] dark:border-slate-900" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                      {exp.duration}
                    </span>
                    <h4 className="text-xl font-black tracking-tight">
                      {exp.jobTitle}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium italic">
                      {exp.companyName}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium mt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">
                No experience records found or data format incorrect.
              </p>
            )}
          </div>
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
