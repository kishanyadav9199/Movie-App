import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    if (!query.trim()) {
      setSearches([]);
      return;
    }

    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
  <div className="relative w-full flex items-center px-4 sm:px-6 md:px-10 py-4">
    {/* Search Icon */}
    <i className="ri-search-line text-zinc-400 text-2xl"></i>

    {/* Input + Results */}
    <div className="relative flex-1 ml-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, TV shows, people..."
        className="w-full bg-transparent outline-none text-white placeholder:text-zinc-500 text-lg"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={() => {
            setQuery("");
            setSearches([]);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
        >
          <i className="ri-close-fill text-2xl"></i>
        </button>
      )}

      {/* Search Results */}
      {searches.length > 0 && (
        <div className="absolute left-0 top-full mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl max-h-[70vh] overflow-y-auto z-50">
          {searches.map((s) => (
            <Link
              key={s.id}
              to={`/${s.media_type}/details/${s.id}`}
              onClick={() => {
                setQuery("");
                setSearches([]);
              }}
              className="flex items-center gap-4 p-3 hover:bg-zinc-800 transition border-b border-zinc-700"
            >
              <img
                src={
                  s.backdrop_path || s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/w300${
                        s.backdrop_path ||
                        s.poster_path ||
                        s.profile_path
                      }`
                    : noimage
                }
                alt={s.title || s.name}
                className="w-14 h-14 rounded object-cover"
              />

              <div>
                <h3 className="text-white font-medium">
                  {s.name ||
                    s.title ||
                    s.original_name ||
                    s.original_title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {s.media_type?.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);
};

export default Topnav;
