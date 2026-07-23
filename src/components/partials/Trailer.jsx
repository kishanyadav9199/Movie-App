import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const category = pathname.includes("movie") ? "movie" : "tv";

  const ytvideo = useSelector((state) => state[category].info.videos);

  if (ytvideo?.name) {
    document.title = `MovieZone | ${ytvideo.name}`;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center px-4 py-6">
      {/* Close Button */}
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 text-white text-3xl sm:text-4xl hover:text-[#6556CD] transition"
      >
        <i className="ri-close-fill"></i>
      </Link>

      {ytvideo ? (
        <div className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl">
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            controls
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Trailer;
