function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="text-sm text-slate-500">
          Crafted with care by{" "}
          <span className="font-semibold text-slate-950">
            Rohit Ranjan Yadav
          </span>
        </p>
        <p className="text-xs font-semibold uppercase tracking-normal text-slate-400">
          Stories, thoughts, and ideas
        </p>
      </div>
    </footer>
  );
}

export default Footer;
