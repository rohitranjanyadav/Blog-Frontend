import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { NavbarSimple } from "../components/Navbar";
import { API_BASE_URL } from "../utils/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(`${API_BASE_URL}/blog`);
        const counts = (response.data.data || []).reduce((acc, blog) => {
          const category = blog.subtitle || "Article";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategories(
          Object.entries(counts).map(([name, count]) => ({ name, count })),
        );
      } catch {
        setError("Unable to load categories right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <NavbarSimple />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-slate-700">
              Categories
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Browse by topic
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Find the article groups currently published on BlogSpace.
            </p>
          </div>

          {isLoading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  className="h-28 animate-pulse rounded-lg border border-slate-200 bg-white shadow-sm"
                  key={item}
                />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-lg border border-red-200 bg-white p-6 text-red-700 shadow-sm">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                  key={category.name}
                >
                  <p className="text-lg font-bold text-slate-950">
                    {category.name}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    {category.count}{" "}
                    {category.count === 1 ? "article" : "articles"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Categories;
