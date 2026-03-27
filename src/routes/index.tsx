import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/home/Hero";
import { ProjectSlider } from "../components/home/ProjectSlider";
import { ServicesSummary } from "../components/home/ServicesSummary";
import { useHomeData, useLatestProjects } from "../hooks/useHome";
import { Loader2 } from "lucide-react";
import { ContactCTA } from "../components/ui/ContactCTA";
import { Reveal } from "../components/ui/Reveal";
import { TestimonialsSummary } from "#/components/home/TestimonialsSummary";

import "../styles.css";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { data: homeResponse, isLoading: homeLoading } = useHomeData();
  const { data: projectsResponse, isLoading: projectsLoading } =
    useLatestProjects();

  const home = homeResponse?.data;

  const projects = Array.isArray(projectsResponse)
    ? projectsResponse
    : projectsResponse?.data || [];

  if (homeLoading || projectsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12 mx-2.5">
      {/* Dynamic Hero with Strapi text */}
      <Hero
        title={home?.heroTitle}
        subtitle={home?.heroSubtitle}
        description={home?.description}
        ctaText={home?.ctaText}
      />

      {/* Slider using real project data */}
      <Reveal delay={0.1}>
        <ProjectSlider projects={projects} />
      </Reveal>

      {/* Services summary (can also be made dynamic similar to About) */}
      <Reveal delay={0.2}>
        <ServicesSummary />
      </Reveal>

      <Reveal delay={0.3}>
        <TestimonialsSummary />
      </Reveal>

      <Reveal delay={0.4}>
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <ContactCTA />
        </div>
      </Reveal>
    </div>
  );
}
