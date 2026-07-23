import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="w-full flex overflow-x-auto overflow-y-auto gap-4 p-4 scrollbar-hide">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            key={i}
            to={`/${d.media_type || title}/details/${d.id}`}
            className="
              flex-shrink-0
              w-[70%]
              sm:w-[45%]
              md:w-[32%]
              lg:w-[24%]
              xl:w-[18%]
              bg-zinc-900 rounded-lg overflow-y-auto shadow-lg
              hover:scale-105 transition-transform duration-300
            "
          >
            <img
              className="w-full h-44 sm:h-48 md:h-52 object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage
              }
              alt={d.title || d.name}
            />

            <div className="p-4">
              <h1 className="text-white text-base sm:text-lg font-semibold line-clamp-2">
                {d.name ||
                  d.title ||
                  d.original_name ||
                  d.original_title}
              </h1>

              <p className="text-zinc-400 text-sm mt-2 line-clamp-3">
                {d.overview?.slice(0, 80)}...
                <span className="text-blue-400"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="w-full py-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Nothing to show
          </h1>
        </div>
      )}
    </div>
  );
};

export default HorizontalCards;