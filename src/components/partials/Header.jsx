import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(
          rgba(0,0,0,.2),
          rgba(0,0,0,.5),
          rgba(0,0,0,.9)
        ),
        url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition:"center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full min-h-[60vh] md:h-[70vh] flex flex-col justify-end px-5 sm:px-8 md:px-12 lg:px-20 py-8"
    >
      {/* Title */}
      <h1 className="w-full md:w-[75%] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>

      {/* Overview */}
      <p className="w-full md:w-[75%] mt-4 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
        {data.overview?.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="ml-2 text-blue-400 hover:text-blue-300"
        >
          more
        </Link>
      </p>

      {/* Info */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm sm:text-base text-white">
        <span>
          <i className="ri-megaphone-fill text-yellow-500 mr-2"></i>
          {data.release_date || "No Information"}
        </span>

        <span>
          <i className="ri-album-fill text-yellow-500 mr-2"></i>
          {data.media_type?.toUpperCase()}
        </span>
      </div>

      {/* Button */}
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="mt-6 w-fit bg-[#6556CD] hover:bg-[#5447b8] transition px-6 py-3 rounded-lg text-white font-semibold"
      >
        ▶ Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
