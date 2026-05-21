import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavbarSimple } from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASE_URL, getImageUrl } from "../utils/api";

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v5" />
      <path d="M14 11v5" />
    </svg>
  );
}

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();

  const hasImage = Boolean(blog?.image);
  const imageUrl = getImageUrl(blog?.image);
  const showImage = hasImage && !imageError;

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        setIsLoading(true);
        setError("");
        setImageError(false);
        const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
        setBlog(response.data.data);
      } catch {
        setError("Unable to load this blog right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]);

  const deleteButton = async () => {
    const response = await axios.delete(`${API_BASE_URL}/blog/${id}`);

    if (response.status === 200) {
      alert("Blog Deleted Successfully!!!");
      navigate("/");
    } else {
      alert("Something Went Wrong!!!");
    }
  };

  return (
    <>
      <NavbarSimple />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            className="mb-6 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
            to="/"
          >
            <BackIcon />
            Back to blogs
          </Link>

          {isLoading && (
            <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6 sm:p-8">
                <div className="h-5 w-28 animate-pulse rounded-md bg-slate-200" />
                <div className="mt-6 h-9 w-3/4 animate-pulse rounded-md bg-slate-200" />
                <div className="mt-4 h-5 w-1/2 animate-pulse rounded-md bg-slate-200" />
              </div>
              <div className="aspect-video w-full animate-pulse bg-slate-200" />
              <div className="space-y-4 p-6 sm:p-8">
                <div className="h-4 animate-pulse rounded-md bg-slate-200" />
                <div className="h-4 animate-pulse rounded-md bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded-md bg-slate-200" />
              </div>
            </article>
          )}

          {!isLoading && error && (
            <div className="rounded-lg border border-red-200 bg-white p-6 text-red-700 shadow-sm">
              <p className="font-semibold">{error}</p>
              <p className="mt-2 text-sm text-red-600">
                Please check that the blog exists and the server is running.
              </p>
            </div>
          )}

          {!isLoading && !error && blog && (
            <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <header className="border-b border-slate-200 p-6 sm:p-8">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-slate-700">
                      {blog.subtitle}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/edit/${id}`}>
                      <button
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                        type="button"
                      >
                        <EditIcon />
                        Edit
                      </button>
                    </Link>
                    <button
                      className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:bg-red-50"
                      type="button"
                      onClick={deleteButton}
                    >
                      <DeleteIcon />
                      Delete
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
                  {blog.title}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  {blog.subtitle}
                </p>
              </header>

              <div className="border-b border-slate-200 bg-slate-100">
                {showImage ? (
                  <img
                    alt={blog.title}
                    className="aspect-video w-full object-cover"
                    onError={() => setImageError(true)}
                    src={imageUrl}
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-slate-200 px-6 text-center text-sm font-semibold text-slate-500 sm:text-base">
                    No image available
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <p className="whitespace-pre-line text-base leading-8 text-slate-700 sm:text-lg">
                  {blog.description}
                </p>
              </div>
            </article>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SingleBlog;
