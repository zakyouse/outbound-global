import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
const articles = {
  "canada-work-permit-guide": {
    title: "Complete Guide to Canada Work Permits",
    image: "/images/canada.jpg",
    date: "March 12, 2026",
    content: `
Canada offers several work permit options for foreign nationals.
These include employer-specific permits and open work permits.

To qualify, applicants must meet eligibility requirements such as
job offers, LMIA approval, or spousal sponsorship...
    `,
  },
};

export default function ResourceArticle() {
  const { slug } = useParams();
  const article =
    slug && slug in articles
      ? articles[slug as keyof typeof articles]
      : undefined;

  if (!article) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-semibold">Article not found</h2>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl">
          <img
            alt={article.title}
            className="rounded-2xl mb-8"
            src={article.image}
          />

          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

          <p className="text-sm text-gray-400 mb-8">{article.date}</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            {article.content}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
