import { ActionBannerSection } from "@/components/sections/action-banner-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WhySection } from "@/components/sections/why-section";
import { getPortfolioData } from "@/lib/portfolio";
import { buildPersonJsonLd } from "@/lib/seo";

export default async function HomePage() {
  const data = await getPortfolioData();
  const jsonLd = buildPersonJsonLd(data);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection data={data} />
      <TrustSection data={data} />
      <ServicesSection data={data} />
      <ProjectsSection data={data} />
      <ProcessSection data={data} />
      <ActionBannerSection data={data} />
      <AboutSection data={data} />
      <WhySection data={data} />
      {/* <TestimonialsSection data={data} /> */}
      <FaqSection data={data} />
      <ContactSection data={data} />
    </>
  );
}
