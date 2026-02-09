import { Button } from "@heroui/button";
import { FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import bg_image from "../images/service_page/pexels-maheshwar-reddy-83083257-16632807.jpg";
import img_one from "../images/service_page/pexels-tugba-ozsoy-259819061-16592561.jpg";

import DefaultLayout from "@/layouts/default";
import ConsultationCTA from "@/components/Home Components/ConsultationCTA";
import { useConsultation } from "@/contexts/consultationContext";
const Services = () => {
  const { setConsultation } = useConsultation();
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <main className="bg-white text-gray-900">
        {/* Header */}
        <section className="relative py-20 px-6 md:px-12 rounded-xl overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bg_image})`,
            }}
          />

          {/* White Mask / Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto">
            <h1 className="text-4xl text-primary md:text-5xl font-bold mb-6">
              Our Immigration Consulting & Administrative Support Services
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Outbound Global Pathways LLC provides structured immigration
              consulting and administrative support to individuals and families
              navigating U.S. immigration processes. Our services are designed
              to help you prepare accurate, well-organized immigration filings
              while understanding your available pathways.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-full mx-auto px-6 md:px-12 my-10">
          <p className="text-gray-700 leading-relaxed mb-6">
            Navigating the U.S. immigration system can be challenging due to the
            volume of forms, documentation requirements, and strict procedural
            rules. Our role is to simplify that process by providing non-legal
            support that helps clients prepare and organize their petitions and
            supporting evidence clearly and professionally.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We focus on EB-1 Extraordinary Ability, EB-2 National Interest
            Waiver (NIW), and select non-immigrant visas. Our services are
            designed to help you present your background, achievements, and
            proposed endeavor in a way that is consistent, structured, and easy
            to review.
          </p>
        </section>

        {/* Consultation */}
        <section className="bg-gray-50 py-20 px-6 md:px-12">
          <div className="max-w-full mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Immigration Consultation Session
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Our one-hour consultation session is the starting point for most
              clients. During this session, we evaluate your credentials,
              discuss your immigration goals, and review potential visa pathways
              based on your background.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              The consultation includes a detailed achievement analysis, visa
              eligibility review, and a discussion of whether EB-1A, EB-2 NIW,
              or another supported pathway may be appropriate for you.
            </p>

            <p className="font-semibold text-gray-900 mb-6">
              Consultation Fee: $100
            </p>

            <Button
              className="transition-all hover:bg-[#CD0E00] bg-secondary text-white px-6 py-3 rounded-lg "
              endContent={<FaBookmark />}
              onPress={() => setConsultation(true)}
            >
              Book Consultation
            </Button>
          </div>
        </section>

        {/* EB-1A */}
        <section className="max-w-full mx-auto px-6 md:px-12 my-20 relative">
          <img
            alt="Consulting workspace with a person at a desk"
            className="absolute -top-65 md:-top-72 rounded-full right-0 object-cover h-64 md:h-84 object-bottom"
            src={img_one}
          />
          <h2 className="text-3xl font-bold mb-6">
            EB-1 Extraordinary Ability (EB-1A) Support
          </h2>

          <p className="text-gray-700 leading-relaxed mb-2">
            The EB-1A category is designed for individuals who have demonstrated
            sustained national or international recognition in their field. Our
            administrative support services help you organize, format, and
            present the documentation needed to demonstrate your qualifications.
          </p>

          <p className="text-gray-700 leading-relaxed mb-2">
            We assist with structuring petition materials, formatting supporting
            documentation, organizing exhibits, and preparing USCIS forms to
            ensure clarity and consistency across your submission.
          </p>

          <Button
            className="bg-mygreen cursor-pointer px-6 py-3 rounded-lg hover:bg-mygreen/80 transition"
            onPress={() => navigate("/contacts")}
          >
            Request EB-1A Support
          </Button>
        </section>

        {/* EB-2 NIW */}
        <section className="bg-gray-50 py-4 max-w-full mx-auto px-6 md:px-12">
          <div className="">
            <h2 className="text-3xl font-bold mb-6">
              EB-2 National Interest Waiver (NIW) Support
            </h2>

            <p className="text-gray-700 leading-relaxed mb-2">
              The EB-2 NIW category is intended for professionals whose work
              serves the national interest of the United States. Our role is to
              help you organize and present documentation that explains your
              background and proposed endeavor clearly.
            </p>

            <p className="text-gray-700 leading-relaxed mb-2">
              We provide general guidance on eligibility requirements, assist
              with organizing evidence, and help prepare and review USCIS forms
              as part of our administrative support services.
            </p>

            <Button
              className="bg-mygreen cursor-pointer  py-3 rounded-lg hover:bg-mygreen/80 transition"
              onPress={() => navigate("/contacts")}
            >
              Request EB-2 NIW Support
            </Button>
          </div>
        </section>

        {/* Petition Drafting */}
        <section className="max-w-full mx-auto px-6 md:px-12  my-4">
          <h2 className="text-3xl font-bold mb-6">
            Petition Drafting & Review Services
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Your petition is more than a collection of forms. It is a structured
            narrative that explains your qualifications and proposed endeavor.
            We assist with drafting and organizing written statements,
            formatting exhibits, and ensuring consistency across all documents.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            For individuals who prepare their own petitions, we also offer
            review services to help identify missing or unclear documentation
            and to improve organization and formatting prior to filing.
          </p>

          <Button
            className="bg-mygreen cursor-pointer  py-3 rounded-lg hover:bg-mygreen/80 transition"
            onPress={() => navigate("/contacts")}
          >
            Request Petition Review
          </Button>
        </section>

        {/* Adjustment of Status */}
        <section className="bg-gray-50 py-20  max-w-full mx-auto px-6 md:px-12">
          <div className="">
            <h2 className="text-3xl font-bold mb-6">
              Adjustment of Status & Consular Processing Support
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              We provide administrative assistance with the preparation of
              Adjustment of Status and related immigration forms, including Form
              I-485 and supporting documentation.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Services are provided by a certified Immigration Forms Specialist
              to help ensure forms are completed accurately and in compliance
              with USCIS requirements.
            </p>

            <Button
              className="bg-mygreen cursor-pointer  py-3 rounded-lg hover:bg-mygreen/80 transition"
              onPress={() => navigate("/contacts")}
            >
              Request Form Support
            </Button>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-full mx-auto px-6 md:px-12   my-2 text-sm text-gray-600">
          <p>
            Disclaimer: Outbound Global Pathways LLC provides immigration
            consulting and administrative support services only. We are not a
            law firm and do not provide legal advice or legal representation.
            Immigration decisions are made solely by U.S. government agencies.
          </p>
        </section>

        {/* CTA + Footer */}
        <ConsultationCTA />
      </main>
    </DefaultLayout>
  );
};

export default Services;
