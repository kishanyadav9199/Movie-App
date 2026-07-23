import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const About = () => {
  document.title = "MovieZone | About";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-3xl text-zinc-400 hover:text-[#6556CD] transition"
          >
            <i className="ri-arrow-left-line"></i>
          </button>

          <div>
            <h1 className="text-4xl font-bold text-[#6556CD]">
              About MovieZone
            </h1>

            <p className="text-zinc-400 mt-2">
              Discover movies, TV shows, and celebrities with a beautiful and
              responsive interface powered by TMDB.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-[#2A2930] rounded-xl p-6 shadow-lg">
          <p className="text-zinc-300 text-lg leading-8">
            <span className="font-semibold text-white">MovieZone</span> is a
            modern movie discovery platform that helps users explore trending,
            popular, top-rated, and upcoming movies and TV shows. Built using
            the powerful TMDB API, MovieZone provides detailed information about
            movies, TV series, and celebrities with a clean, fast, and fully
            responsive user interface.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#6556CD] mb-6">Features</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2A2930] rounded-xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3">
                <i class="ri-chrome-fill"></i>
                Browse Content
              </h3>
              <p className="text-zinc-400">
                Explore trending, popular, top-rated, and upcoming movies and TV
                shows.
              </p>
            </div>

            <div className="bg-[#2A2930] rounded-xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3">
                <i class="ri-search-2-fill"></i>
                Smart Search
              </h3>
              <p className="text-zinc-400">
                Search movies, TV shows, and celebrities with instant search
                suggestions.
              </p>
            </div>

            <div className="bg-[#2A2930] rounded-xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3">
                <i class="ri-movie-2-fill"></i> Movie Details
              </h3>
              <p className="text-zinc-400">
                Get ratings, release dates, genres, overviews, trailers, and
                cast information.
              </p>
            </div>

            <div className="bg-[#2A2930] rounded-xl p-6 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-3">
                <i class="ri-smartphone-fill"></i>
                Responsive Design
              </h3>
              <p className="text-zinc-400">
                Optimized for desktop, tablet, and mobile devices with a modern
                UI.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#6556CD] mb-5">
            Technology Stack
          </h2>

          <div className="flex flex-wrap gap-4">
            {[
              "React.js",
              "Vite",
              "Tailwind CSS",
              "React Router",
              "Redux",
              "Axios",
              "TMDB API",
            ].map((tech) => (
              <span
                key={tech}
                className="bg-[#6556CD] px-5 py-2 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-zinc-700 pt-6">
          <p className="text-zinc-400 leading-7 text-center">
            © {new Date().getFullYear()} MovieZone. All movie data, posters, and
            information are provided by
            <span className="text-[#6556CD] font-semibold">
              {" "}
              The Movie Database (TMDB)
            </span>
            . MovieZone is created for educational purposes and is not
            affiliated with or endorsed by TMDB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
