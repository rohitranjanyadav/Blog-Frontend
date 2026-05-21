import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { NavbarSimple } from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../utils/api";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(`${API_BASE_URL}/blog`);
        setBlogs(response.data.data || []);
      } catch {
        setError("Unable to load articles right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const query = search.toLowerCase();

    return [blog.title, blog.subtitle, blog.description]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });

  return (
    <>
      <NavbarSimple />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-slate-700">
                Latest articles
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
                Discover thoughtful stories
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Browse travel, technology, lifestyle, creativity, and everyday
                ideas in one clean reading space.
              </p>
            </div>

            <label className="w-full md:max-w-sm">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                Search articles
              </span>
              <input
                className="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or topic"
                type="search"
                value={search}
              />
            </label>
          </div>

          {isLoading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                  key={item}
                >
                  <div className="aspect-4/3 animate-pulse bg-slate-200" />
                  <div className="space-y-4 p-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-6 animate-pulse rounded bg-slate-200" />
                    <div className="h-16 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="rounded-lg border border-red-200 bg-white p-6 text-red-700 shadow-sm">
              <p className="font-semibold">{error}</p>
              <p className="mt-2 text-sm text-red-600">
                Please try again after checking that the API is running.
              </p>
            </div>
          )}

          {!isLoading && !error && filteredBlogs.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredBlogs.map(function (blog) {
                return <Card blog={blog} key={blog._id} />;
              })}
            </div>
          )}

          {!isLoading && !error && filteredBlogs.length === 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">
                No articles found
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Try another search term or create a new article.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
