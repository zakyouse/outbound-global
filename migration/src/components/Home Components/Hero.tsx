import { motion } from "framer-motion";
import { button as buttonStyles } from "@heroui/theme";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";
import { useConsultation } from "@/contexts/consultationContext";
const HeroSection = ({ img }: { img: string }) => {
  const { consultation, setConsultation } = useConsultation();

  return (
    <section className="relative z-1 overflow-hidden -top-12 rounded-xl h-screen md:h-auto">
      {/* Background Image */}
      <motion.img
        alt="Immigration consultation support"
        animate={{ opacity: 0.6, x: 0, scale: 1 }}
        className="
          block
          absolute right-0 top-1/2 -translate-y-1/2
          md:w-[520px] lg:w-full
          pointer-events-none
          select-none
          mask-gradient h-screen md:h-auto
        "
        initial={{ opacity: 0, x: 80, scale: 1.05 }}
        src={img}
        transition={{
          duration: 15,
          ease: "easeOut",
          repeat: Infinity,
          repeatDelay: 5,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center gap-16 md:gap-4 py-8 md:py-20 px-6 md:px-12">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className={title({ color: "blue" })}>
            OUTBOUND GLOBAL PATHWAYS
          </span>
          <br />
          <span className={title()}>
            Supporting Your Journey Across Borders
          </span>

          <div className={subtitle({ class: "mt-4" })}>
            We simplify the immigration process by providing clear immigration
            consulting and administrative support for individuals pursuing EB-1
            Extraordinary Ability, EB-2 National Interest Waiver (NIW), and
            select non-immigrant visas.
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
          initial={{ opacity: 0, y: 15 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            className={buttonStyles({
              color: "secondary",
              radius: "sm",
              variant: "shadow",
            })}
            onPress={() => setConsultation(!consultation)}
          >
            Book a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
