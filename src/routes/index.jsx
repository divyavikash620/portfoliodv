import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar.jsx";
import { Hero } from "../components/Hero.jsx";
import { Projects } from "../components/Projects.jsx";
import { AboutEducation } from "../components/AboutEducation.jsx";
import { Skills } from "../components/Skills.jsx";
import { CodingJourney } from "../components/CodingJourney.jsx";
import { Certificates } from "../components/Certificates.jsx";
import { Contact } from "../components/Contact.jsx";
import { Footer } from "../components/Footer.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Divya Vikash — CS Student, Builder of Small Systems" },
      {
        name: "description",
        content:
          "Divya Vikash builds databases, records systems and analysis tools. Projects, education, skills and coding journey — with an interactive 3D interface.",
      },
      { property: "og:title", content: "Divya Vikash — CS Student, Builder of Small Systems" },
      {
        property: "og:description",
        content:
          "Projects, education, skills and coding journey of Divya Vikash, Computer Science student at Lovely Professional University.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <AboutEducation />
        <Skills />
        <CodingJourney />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
