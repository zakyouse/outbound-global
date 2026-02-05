import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import img from "../../src/images/services_section/pexels-emma-bauso-1183828-2253879.jpg";
import imgg from "../../src/images/services_section/pexels-marta-klement-636760-1438081.jpg";
import immg from "../../src/images/services_section/pexels-olly-927022.jpg";

import DefaultLayout from "@/layouts/default";

const articles = [
  {
    slug: "canada-work-permit-guide",
    title: "Complete Guide to Canada Work Permits",
    excerpt:
      "Learn the different types of Canadian work permits, eligibility requirements, and how to apply successfully.",
    image: img,
    category: "Work Visas",
    date: "March 12, 2026",
  },
  {
    slug: "study-abroad-checklist",
    title: "Study Abroad Checklist for International Students",
    excerpt:
      "From choosing a country to visa approval, here’s everything you need before studying abroad.",
    image: imgg,
    category: "Study Visas",
    date: "March 8, 2026",
  },
  {
    slug: "family-reunification",
    title: "How Family Reunification Visas Work",
    excerpt:
      "Understand the process of sponsoring family members and reuniting abroad legally.",
    image: immg,
    category: "Family Migration",
    date: "March 2, 2026",
  },
];

export default function Resources() {
  return (
    <DefaultLayout>
      <section className=" px-4">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Migration <span className="text-primary">Resources</span>
            </h1>
            <p className="text-gray-600">
              Expert insights, guides, and updates to help you make informed
              migration decisions.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <motion.article
                key={article.slug}
                className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    alt={article.title}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    src={article.image}
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-xs text-primary font-semibold">
                    {article.category}
                  </div>

                  <h2 className="text-lg font-semibold">{article.title}</h2>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xs text-gray-400">
                      {article.date}
                    </span>

                    <Link
                      className="text-sm font-medium text-primary hover:underline"
                      to={`/resources/${article.slug}`}
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
