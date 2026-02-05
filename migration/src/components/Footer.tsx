import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Outbound Global Pathways LLC
            </h3>
            <p className="text-sm leading-relaxed">
              Supporting your journey across borders. We provide clear,
              structured immigration consulting and administrative support
              tailored to your goals.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Consultation Sessions</li>
              <li>EB-1A Petition Support</li>
              <li>EB-2 NIW Support</li>
              <li>Petition Review & Drafting</li>
              <li>Adjustment of Status Support</li>
            </ul>
          </div>

          {/* Important Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Important Information
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Not a law firm</li>
              <li>No legal advice provided</li>
              <li>No guarantee of outcomes</li>
              <li>Fees are not outcome-based</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Connect With Us
            </h4>

            <div className="flex gap-4 mt-4">
              <a
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
                href="www.google.com"
              >
                <FaFacebookF />
              </a>

              <a
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition"
                href="www.google.com"
              >
                <FaLinkedinIn />
              </a>

              <a
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition"
                href="www.google.com"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Outbound Global Pathways LLC. All
            rights reserved.
          </p>

          <p className="mt-2 max-w-4xl mx-auto">
            Disclaimer: Outbound Global Pathways provides immigration consulting
            and administrative support services only. We are not a law firm and
            do not provide legal advice or legal representation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
