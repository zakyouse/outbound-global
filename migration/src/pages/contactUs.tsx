import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { FaPhoneFlip, FaMapPin } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { useEffect, useState } from "react";
import { Input, Textarea } from "@heroui/input";
import axios from "axios";

import img from "../images/contact_us/pexels-mikhail-nilov-7682096.jpg";

import DefaultLayout from "@/layouts/default";

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  /* =======================
     FORM STATE
  ======================== */
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* =======================
     HANDLE INPUT CHANGE
  ======================== */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  /* =======================
     SUBMIT MESSAGE
  ======================== */
  async function submitMessage(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/messages.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setSuccess(response.data.message);

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        message: "",
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DefaultLayout>
      <section className="px-4 grid md:grid-cols-2 gap-2">
        <div className="grid gap-8">
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
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary">
                  <MdMail size={20} />
                </span>
                <span>info@yourcompany.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">
                  <FaPhoneFlip size={20} />
                </span>
                <span>+18146898466</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary">
                  <FaMapPin size={20} />
                </span>
                <span>State College, PA</span>
              </div>
            </div>

            {/* FORM */}
            <motion.form
              className="rounded-2xl bg-mywhite shadow-lg p-8 space-y-4"
              initial={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
              onSubmit={submitMessage}
            >
              <Input
                isRequired
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />

              <Input
                isRequired
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Textarea
                isRequired
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              {success && <p className="text-green-600 text-sm">{success}</p>}

              <Button
                className="w-full h-14"
                color="secondary"
                isDisabled={loading}
                type="submit"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </motion.div>
        </div>

        <img alt="contact us" className="rounded-xl" src={img} />
      </section>
    </DefaultLayout>
  );
}
