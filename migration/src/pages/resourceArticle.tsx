import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import axios from "axios";
import { Link } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

interface Resource {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  created_at: string;
  published: number;
}

export default function ResourceArticle() {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/resources.php");
        const allResources: Resource[] = res.data;

        // Find resource by slug
        const found = allResources.find((r) => r.slug === slug);

        if (!found) {
          setError("Resource not found");
          setResource(null);
        } else {
          setResource(found);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load resource");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchResource();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-500 flex justify-center items-center">
        <span className="animate-spin mr-2">
          <VscLoading size={24} />
        </span>
        Loading...
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-semibold">{error || "Resource not found"}</h2>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <section className="py-24 px-4">
        <Link to="/resources" className="text-sm text-gray-400 mb-4 inline-block">
          &larr; Back to Resources
        </Link>
        <div className="mx-auto max-w-3xl space-y-6">
          {resource.image && (
            <img
              alt={resource.title}
              className="rounded-2xl mb-8 w-full object-cover"
              src={`http://localhost:3000/${resource.image}`}
            />
          )}

          <h1 className="text-3xl font-bold">{resource.title}</h1>

          <p className="text-sm text-gray-400">
            {new Date(resource.created_at).toLocaleDateString()} |{" "}
            <span className="capitalize">{resource.category}</span>
          </p>

          <div className="prose prose-lg max-w-none text-gray-700">
            {/* Display HTML content properly */}
            <div dangerouslySetInnerHTML={{ __html: resource.content }} />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
