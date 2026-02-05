import { FaCalendarCheck } from "react-icons/fa";
import { Button } from "@heroui/button";
import { FaBookmark } from "react-icons/fa6";

import { useConsultation } from "@/contexts/consultationContext";

const ConsultationCTA = () => {
  const { setConsultation } = useConsultation();

  return (
    <section className="bg-gradient-to-b from-primary to-mywhite rounded-xl p-8 md:p-12 my-16 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <FaCalendarCheck size={36} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Schedule a One-on-One Immigration Consultation
        </h2>

        <p className="text-blue-100 text-lg mb-8">
          Our consultation sessions are designed to evaluate your credentials,
          assess visa eligibility, and help you identify the most suitable
          immigration pathway based on your qualifications and goals.
        </p>

        <div className="bg-white text-gray-900 rounded-xl p-6 md:p-8 max-w-2xl mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-4">
            What the Consultation Includes
          </h3>

          <ul className="space-y-2 text-left text-gray-700">
            <li>• One-hour session with an immigration support expert</li>
            <li>• Detailed achievement and credential analysis</li>
            <li>• Visa eligibility and pathway assessment</li>
            <li>• EB-2 NIW or EB-1A criteria evaluation</li>
          </ul>

          <p className="mt-4 font-medium text-gray-900">
            Consultation Fee: <span className="text-blue-600">$150</span>
          </p>
        </div>

        <Button
          className="bg-secondary text-mywhite font-semibold px-8 py-3 rounded-lg transition-all hover:bg-[#CD0E00] "
          endContent={<FaBookmark />}
          onPress={() => setConsultation(true)}
        >
          Book Consultation
        </Button>

        <p className="text-sm text-blue-100 mt-6">
          Disclaimer: Outbound Global Pathways provides immigration consulting
          and administrative support services only and does not offer legal
          advice or legal representation.
        </p>
      </div>
    </section>
  );
};

export default ConsultationCTA;
