import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { FaPhoneFlip, FaMapPin } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { useEffect } from "react";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";

import img from "../images/contact_us/pexels-mikhail-nilov-7682096.jpg";

import DefaultLayout from "@/layouts/default";

export default function Contact() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  return (
    <DefaultLayout>
      <section className="px-4 grid md:grid-cols-2 gap-2">
        <div className=" grid gap-8 ">
          {/* Left: Text & Info */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold">
              Let’s Talk About Your{" "}
              <span className="text-primary">Migration Journey</span>
            </h1>

            <p className="text-gray-600 max-w-md">
              Whether you’re planning to study, work, or settle abroad, our team
              is ready to guide you with clarity and confidence.
            </p>

            {/* Contact Info */}
            <motion.div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="h-5 w-5 text-primary flex items-center">
                    <MdMail color="currentColor" size={20} />
                  </span>
                  <span>info@yourcompany.com</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <span className="h-5 w-5 text-primary flex items-center">
                    <FaPhoneFlip color="currentColor" size={20} />
                  </span>
                  <span>+254 7XX XXX XXX</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <span className="h-5 w-5 text-primary flex items-center">
                    <FaMapPin color="currentColor" size={20} />
                  </span>
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </motion.div>
            {/* Right: Form */}
            <motion.form
              className="rounded-2xl bg-mywhite shadow-lg p-8 space-y-4"
              initial={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Input
                isRequired
                className="max-w-full"
                defaultValue="John Doe"
                label="Full Name"
                type="text"
              />

              <Input
                isRequired
                className="max-w-full"
                defaultValue="my@email.com"
                label="Email"
                type="email"
              />

              <Textarea
                isClearable
                className="max-w-full"
                defaultValue="Tell us more about your migration goals..."
                label="Message"
                placeholder="Message"
                variant="bordered"
                // eslint-disable-next-line no-console
                onClear={() => console.log("textarea cleared")}
              />

              <Button className="w-full h-14" color="secondary">
                Send Message
              </Button>
            </motion.form>
          </motion.div>
        </div>
        <img alt="contact us" className="rounded-xl" src={img} />
      </section>
    </DefaultLayout>
  );
}
