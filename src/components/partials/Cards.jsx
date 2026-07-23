import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const Cards = ({ data, title }) => {
  return (
    <div className="w-full min-h-screen bg-[#1F1E24] px-4 sm:px-6 md:px-8 py-6">
      {/* Scroll to Top */}
      <Link
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-[#6556cd] rounded-lg shadow-lg hover:bg-[#5447b8] transition"
      >
        <i className="ri-arrow-up-line text-white text-2xl"></i>
      </Link>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((c, i) => (
          <Link
            key={i}
            to={`/${c.media_type || title}/details/${c.id}`}
            className="
              w-[45%]
              sm:w-[45%]
              md:w-[30%]
              lg:w-[22%]
              xl:w-[18%]
            "
          >
            <img
              className="w-full h-[280px] sm:h-[320px] md:h-[340px] lg:h-[360px] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              alt={c.title || c.name}
            />

            <h1 className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-zinc-300 line-clamp-2">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>

            {c.vote_average > 0 && (
              <div className="absolute top-3 right-3 bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold shadow-lg">
                {(c.vote_average * 10).toFixed()}%
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
