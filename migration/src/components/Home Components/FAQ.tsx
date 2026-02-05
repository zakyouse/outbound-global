import { Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Are you a law firm?",
    answer:
      "No. Outbound Global Pathways is not a law firm and does not provide legal advice or legal representation. We offer immigration consulting and administrative support services only.",
  },
  {
    question: "Do you guarantee approval?",
    answer:
      "No. All immigration decisions are made solely by U.S. government agencies, and outcomes are never guaranteed.",
  },
  {
    question: "How are your fees structured?",
    answer:
      "Fees are based on the scope of services and are clearly communicated before work begins. Fees are not outcome-based.",
  },
  {
    question: "Are your fees refundable?",
    answer:
      "Fees are generally non-refundable once work has begun, unless stated otherwise in writing.",
  },
  {
    question: "Do you offer consultation sessions?",
    answer:
      "Yes. Consultations are offered for a flat fee and provide general information and administrative guidance only.",
  },
];

const FAQSection = () => {
  return (
    <section className="my-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-700 text-center mb-10">
          Below are answers to some common questions about our immigration
          consulting and administrative support services.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="bg-blue-50 rounded-xl p-5">
                  <Disclosure.Button className="flex justify-between cursor-pointer items-center w-full text-left">
                    <span className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`transition-transform ${open ? "rotate-180" : ""}`}
                    >
                      <FaChevronDown />
                    </span>
                  </Disclosure.Button>

                  <Disclosure.Panel className="mt-3 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
