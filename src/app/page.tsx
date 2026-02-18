import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { StrengthSection } from "@/components/sections/strength-section";
import { FounderSection } from "@/components/sections/founder-section";
import { ServicesSection } from "@/components/sections/services-section";
import { CompanySection } from "@/components/sections/company-section";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-500 selection:text-white antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <StrengthSection />
        <FounderSection />
        <ServicesSection />
        <CompanySection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
