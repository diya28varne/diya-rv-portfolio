import { About } from "@/components/About";
import { Assemble } from "@/components/Assemble";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Nav } from "@/components/Nav";
import { AiGuide } from "@/components/AiGuide";
import { Resume } from "@/components/Resume";
import { Toolbox } from "@/components/Toolbox";
import { Work } from "@/components/Work";

export default function HomePage() {
  return (
    <div id="top" className="relative overflow-x-clip">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-3 py-4 sm:px-5 sm:py-6">
        <section className="shell" aria-label="Intro">
          <Nav />
          <Assemble />
        </section>
        <main id="content" className="flex min-w-0 flex-col gap-4">
          <About />
          <Toolbox />
          <Work />
          <Certificates />
          <Resume />
          <Contact />
        </main>
      </div>
      <AiGuide />
    </div>
  );
}
