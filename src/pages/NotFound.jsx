import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { NavbarSimple } from "../components/Navbar";

function NotFound() {
  return (
    <>
      <NavbarSimple />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-slate-700">
              404
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
              The page you opened does not exist, but the articles are still
              waiting on the home page.
            </p>
            <Link
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              to="/"
            >
              Back to home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default NotFound;
