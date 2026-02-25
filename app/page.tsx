import { Navbar } from "@/components/navbar"
import { SocialSidebar } from "@/components/social-sidebar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ContourBackground } from "@/components/contour-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ContourBackground />
      <div className="relative z-10">
        <Navbar />
        <SocialSidebar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
