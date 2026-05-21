import Footer from "../components/Footer";
import { NavbarSimple } from "../components/Navbar";

function About() {
  return (
    <>
      <NavbarSimple />

      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-normal text-slate-700">
              About BlogSpace
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              A clean place for thoughtful writing
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
              BlogSpace brings together short, readable articles across travel,
              technology, lifestyle, creativity, and personal growth. The goal
              is simple: make publishing easy and make reading feel calm.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
              Built and curated by{" "}
              <span className="font-semibold text-slate-950">
                Rohit Ranjan Yadav
              </span>
              , this space keeps the focus on clear ideas, useful stories, and
              a smooth experience on every screen.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;
