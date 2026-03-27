import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/home/Hero";
import { ProjectSlider } from "../components/home/ProjectSlider";
import { ServicesSummary } from "../components/home/ServicesSummary";
import { useHomeData, useLatestProjects } from "../hooks/useHome";
import { Loader2 } from "lucide-react";

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
      <ProjectSlider projects={projects} />

      {/* Services summary (can also be made dynamic similar to About) */}
      <ServicesSummary />
    </div>
  );
}
