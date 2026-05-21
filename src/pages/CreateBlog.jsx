import { useState } from "react";
import { NavbarSimple } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { API_BASE_URL } from "../utils/api";

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v12" />
      <path d="m17 8-5-5-5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}

function CreateBlog() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };

  const createBlog = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${API_BASE_URL}/blog`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      navigate("/");
    } else {
      alert("Something Went Wrong!!!");
    }
  };

  return (
    <>
      <NavbarSimple />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-slate-700">
              New article
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Create Blog
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Add a clear title, short subtitle, and cover image for your next
              post.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <form
              onSubmit={createBlog}
              className="rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-200 p-6 sm:p-8">
                <h2 className="text-xl font-bold tracking-normal text-slate-950">
                  Blog details
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep the opening information concise so readers can scan it
                  quickly.
                </p>
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-800"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    id="title"
                    name="title"
                    placeholder="Write a strong blog title"
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-800"
                    htmlFor="subtitle"
                  >
                    Subtitle
                  </label>
                  <input
                    className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    id="subtitle"
                    name="subtitle"
                    placeholder="Add a short category or summary"
                    type="text"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-800"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="min-h-40 w-full resize-y rounded-md border border-slate-200 bg-white px-4 py-3 text-base leading-7 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                    id="description"
                    name="description"
                    placeholder="Start writing your blog content..."
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-800"
                    htmlFor="image"
                  >
                    Cover image
                  </label>
                  <label
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-slate-400 hover:bg-white"
                    htmlFor="image"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm">
                      <UploadIcon />
                    </span>
                    <span className="mt-4 text-sm font-semibold text-slate-950">
                      Upload cover image
                    </span>
                    <span className="mt-1 text-sm text-slate-500">
                      PNG, JPG, or WEBP up to 5MB
                    </span>
                    <input
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end sm:p-8">
                <button className="h-11 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                  Create Blog
                </button>
              </div>
            </form>

            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                  <ImageIcon />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Cover preview
                  </h2>
                  <p className="text-sm text-slate-500">Ready for upload</p>
                </div>
              </div>

              <div className="mt-6 flex aspect-4/3 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-6 text-center text-sm font-semibold text-slate-500">
                Selected image will appear in your blog card
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                <p className="text-sm font-semibold text-slate-950">
                  Before publishing
                </p>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  Title is clear and readable
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  Subtitle supports the topic
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-slate-300" />
                  Cover image matches the post
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default CreateBlog;
