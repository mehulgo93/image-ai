import { auth } from "@/auth";
import { Banner } from "./banner";
import { ProjectsSection } from "./projects-section";
import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <ProjectsSection />
    </div>
  );
}
