import { useState } from "react";
import { Link } from "react-router-dom";

function ArrowIcon() {
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
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Card({ blog }) {
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(blog.image);
  const imageUrl = hasImage ? `http://localhost:3000/${blog.image}` : "";
  const showImage = hasImage && !imageError;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
      <Link className="block bg-slate-100" to={`/blog/${blog._id}`}>
        {showImage ? (
          <img
            alt={blog.title}
            className="aspect-4/3 w-full object-cover"
            onError={() => setImageError(true)}
            src={imageUrl}
          />
        ) : (
          <div className="flex aspect-4/3 w-full items-center justify-center bg-slate-200 px-6 text-center text-sm font-semibold text-slate-500">
            No image available
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-normal text-slate-500">
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700">
            {blog.subtitle}
          </span>
        </div>

        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-lg font-bold leading-snug tracking-normal text-slate-950">
            {blog.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {blog.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-950">
              {blog.subtitle}
            </p>
            <p className="text-xs text-slate-500">Read full article</p>
          </div>

          <Link
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-950 text-white transition hover:bg-slate-800"
            to={`/blog/${blog._id}`}
          >
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}
