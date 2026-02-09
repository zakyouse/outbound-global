import hero_image from "../images/about_page/pexels-yankrukov-7640434.jpg";

import DefaultLayout from "@/layouts/default";
import WhyChooseUs from "@/components/Home Components/why_choose_us";
import ImpactStats from "@/components/Home Components/stats";
import ServicesSection from "@/components/Home Components/service_section";
import ConsultationCTA from "@/components/Home Components/ConsultationCTA";
import FAQSection from "@/components/Home Components/FAQ";
import ReviewsSlider from "@/components/Home Components/ReviewSlider";

const AboutUs = () => {
  return (
    <DefaultLayout>
      <main className="bg-white text-gray-900">
        <img
          alt="hero image"
          className="w-full object-cover h-84 rounded-lg object-right-bottom"
          src={hero_image}
        />

        {/* About Content */}
        <section className="max-w-screen mx-auto px-6 md:px-12 my-10">
          <h2 className="text-4xl md:text-4xl font-bold mb-6 text-secondary font-outfit">
            About Outbound Global Pathways
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Outbound Global Pathways LLC provides immigration consulting and
            administrative support services to individuals and families pursuing
            U.S. immigration pathways. We focus on supporting clients seeking
            EB-1 Extraordinary Ability, EB-2 National Interest Waiver (NIW), and
            select non-immigrant visas.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Navigating the immigration process can be complex and overwhelming.
            Our goal is to simplify that journey by offering clear guidance,
            structured documentation support, and well-organized petition
            preparation tailored to each client’s background and objectives.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We are not a law firm and do not provide legal advice or legal
            representation. Our role is to provide non-legal administrative
            support to help ensure immigration-related forms and documentation
            are completed accurately and in compliance with USCIS requirements.
          </p>
        </section>

        {/* Core Sections */}
        <WhyChooseUs />
        <ImpactStats />
        <ServicesSection />
        <ReviewsSlider />
        <FAQSection />
        <ConsultationCTA />
      </main>
    </DefaultLayout>
  );
};

export default AboutUs;
