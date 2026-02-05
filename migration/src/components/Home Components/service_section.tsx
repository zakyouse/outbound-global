import { motion } from "framer-motion";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import img_work from "../../images/services_section/pexels-olly-927022.jpg";
import img_student from "../../images/services_section/pexels-marta-klement-636760-1438081.jpg";
import img_permanent from "../../images/services_section/pexels-vinta-supply-co-nyc-268013-842961.jpg";
import img_family from "../../images/services_section/pexels-emma-bauso-1183828-2253879.jpg";
const services = [
  {
    title: "Immigration Consultation Session",
    description:
      "A one-hour session designed to evaluate your credentials, review visa eligibility, and identify the most suitable immigration pathway based on your qualifications.",
    image: img_work,
  },
  {
    title: "EB-1A Petition Support",
    description:
      "Administrative support for individuals with extraordinary ability, including organization of petition materials, evidence structuring, and form preparation assistance.",
    image: img_student,
  },
  {
    title: "EB-2 NIW Support",
    description:
      "Guidance and administrative assistance for professionals whose work serves the national interest of the United States, focusing on eligibility review and documentation organization.",
    image: img_family,
  },
  {
    title: "Adjustment of Status & Consular Processing",
    description:
      "Administrative assistance with the preparation and organization of immigration forms and supporting documentation in compliance with USCIS requirements.",
    image: img_permanent,
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900">
          Our Services
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-xl">
                {/* Image */}
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    alt={service.title}
                    className="h-64 md:h-40 w-full object-cover"
                    src={service.image}
                  />
                </div>

                {/* Content */}
                <CardBody className="gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardBody>

                {/* Action */}
                <CardFooter>
                  <Button
                    color="primary"
                    radius="full"
                    size="sm"
                    variant="flat"
                    onPress={() => navigate("/contacts")}
                  >
                    Request Service
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
