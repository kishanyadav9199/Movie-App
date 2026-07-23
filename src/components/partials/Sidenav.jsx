import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#6556CD] p-2 rounded-lg"
      >
        <i className="ri-menu-line text-2xl"></i>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-[#1F1E24]
          border-r border-zinc-700
          p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 md:hidden text-white"
        >
          <i className="ri-close-line text-3xl"></i>
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          <i className="ri-tv-fill text-[#6556CD] mr-2"></i>
          MovieZone
        </h1>

        <nav className="mt-10">
          <h2 className="text-lg font-semibold text-white mb-4">New Feeds</h2>

          <div className="flex flex-col gap-2">
            <Link
              to="/trending"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
            >
              <i className="ri-fire-fill"></i>
              Trending
            </Link>

            <Link
              to="/popular"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
            >
              <i className="ri-bard-fill"></i>
              Popular
            </Link>

            <Link
              to="/movie"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
            >
              <i className="ri-movie-2-fill"></i>
              Movies
            </Link>

            <Link
              to="/tv"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
            >
              <i className="ri-tv-2-fill"></i>
              TV Shows
            </Link>

            <Link
              to="/person"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
            >
              <i className="ri-team-fill"></i>
              People
            </Link>
          </div>
        </nav>

        <hr className="my-8 border-zinc-700" />

        <nav>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
          >
            <i className="mr-2 ri-information-fill"></i>
            About Us
          </Link>

          <div className="flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:bg-[#6556CD] hover:text-white"
            >
              <i className="mr-2 ri-phone-fill"></i>
              Contact Us
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidenav;
