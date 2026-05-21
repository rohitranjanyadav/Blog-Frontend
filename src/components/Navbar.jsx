import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

function SearchIcon() {
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
      <path d="m21 21-4.35-4.35" />
      <circle cx="11" cy="11" r="7" />
    </svg>
  );
}

function MenuIcon({ open }) {
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
      {open ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function NavbarSimple() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-base font-bold text-white">
            B
          </span>
          <span className="text-xl font-bold tracking-normal text-slate-950">
            BlogSpace
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
              key={item.label}
              to={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            aria-label="Search posts"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            to="/articles"
          >
            <SearchIcon />
          </Link>
          <Link
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            to="/create"
          >
            Create
          </Link>
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <MenuIcon open={isMenuOpen} />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                className="rounded-md px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                key={item.label}
                onClick={() => setIsMenuOpen(false)}
                to={item.href}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-3">
              <Link
                aria-label="Search posts"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-600"
                onClick={() => setIsMenuOpen(false)}
                to="/articles"
              >
                <SearchIcon />
              </Link>
              <Link
                className="flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
                to="/create"
              >
                Create
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
