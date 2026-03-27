import { Hero } from "./Hero";
import { ProjectSlider } from "./ProjectSlider";
import { ServicesSummary } from "./ServicesSummary";

export function Home() {
  return (
    <div className="space-y-32 pb-32">
      <Hero />
      <ProjectSlider />
      <ServicesSummary />
    </div>
  );
}
