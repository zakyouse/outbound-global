"use client";

import img from "../images/hero_section/pexels-n-voitkevich-7235904.jpg";

import DefaultLayout from "@/layouts/default";
import Why_choose_us from "@/components/Home Components/why_choose_us";
import ImpactStats from "@/components/Home Components/stats";
import ConsultationCTA from "@/components/Home Components/ConsultationCTA";
import FAQSection from "@/components/Home Components/FAQ";
import ReviewsSlider from "@/components/Home Components/ReviewSlider";
import HeroSection from "@/components/Home Components/Hero";
import ServicesSection from "@/components/Home Components/service_section";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <HeroSection img={img} />
      <ServicesSection />

      <Why_choose_us />
      <ImpactStats />
      <ConsultationCTA />
      <FAQSection />
      <ReviewsSlider />
    </DefaultLayout>
  );
}
