import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const Moviedetails = () => {
  document.title = "MovieZone | Movie Details";

  const navigate = useNavigate();
  const { id } = useParams();

  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  if (!info) return <Loading />;

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,.25),
          rgba(0,0,0,.65),
          rgba(0,0,0,.95)
        ),
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      }}
    >
      {/* ================= Navigation ================= */}

      <nav className="flex flex-wrap items-center gap-6 px-5 sm:px-8 lg:px-14 py-6 text-white text-xl">
        <button
          onClick={() => navigate(-1)}
          className="text-3xl hover:text-[#6556CD] transition"
        >
          <i className="ri-arrow-left-line"></i>
        </button>

        {info.detail.homepage && (
          <a
            href={info.detail.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6556CD]"
          >
            <i className="ri-external-link-fill"></i>
          </a>
        )}

        {info.externalid?.wikidata_id && (
          <a
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6556CD]"
          >
            <i className="ri-earth-fill"></i>
          </a>
        )}

        {info.externalid?.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#6556CD] font-semibold"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* ================= Poster + Details ================= */}

      <div className="px-5 sm:px-8 lg:px-14 pb-10 flex flex-col lg:flex-row gap-10">
        {/* Poster */}

        <div className="flex justify-center lg:block">
          <img
            className="w-full max-w-[300px] md:max-w-[360px] rounded-xl shadow-2xl object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt={info.detail.title}
          />
        </div>

        {/* Details */}

        <div className="flex-1 text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="ml-3 text-lg sm:text-xl font-semibold text-zinc-300">
              ({info.detail.release_date?.split("-")[0]})
            </small>
          </h1>

          {/* Rating */}

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center font-bold">
              {(info.detail.vote_average * 10).toFixed()}%
            </div>

            <span className="font-semibold text-lg">User Score</span>

            <span>{info.detail.release_date}</span>

            <span>{info.detail.genres?.map((g) => g.name).join(", ")}</span>

            <span>{info.detail.runtime} min</span>
          </div>

          {/* Tagline */}

          {info.detail.tagline && (
            <h2 className="mt-6 italic text-zinc-300 text-lg sm:text-xl">
              {info.detail.tagline}
            </h2>
          )}

          {/* Overview */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Overview</h2>

            <p className="leading-8 text-zinc-200">{info.detail.overview}</p>
          </div>

          {/* Languages */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Available Languages</h2>

            <p className="text-zinc-300">{info.translations?.join(", ")}</p>
          </div>

          {/* Trailer Button */}

          <Link
            to="trailer"
            className="inline-flex items-center gap-3 mt-8 bg-[#6556CD] hover:bg-[#5548c7] transition px-6 py-3 rounded-lg font-semibold"
          >
            <i className="ri-play-fill text-xl"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* ================= Watch Providers ================= */}

      <div className="px-5 sm:px-8 lg:px-14 pb-10 space-y-8">
        {/* Streaming */}
        {info.watchproviders?.flatrate?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Available on Streaming
            </h2>

            <div className="flex flex-wrap gap-4">
              {info.watchproviders.flatrate.map((provider, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  title={provider.provider_name}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shadow-lg"
                  />

                  <span className="text-white text-xs mt-2 text-center max-w-[70px]">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {info.watchproviders?.rent?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Available on Rent
            </h2>

            <div className="flex flex-wrap gap-4">
              {info.watchproviders.rent.map((provider, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  title={provider.provider_name}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shadow-lg"
                  />

                  <span className="text-white text-xs mt-2 text-center max-w-[70px]">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buy */}
        {info.watchproviders?.buy?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Available to Buy
            </h2>

            <div className="flex flex-wrap gap-4">
              {info.watchproviders.buy.map((provider, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  title={provider.provider_name}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shadow-lg"
                  />

                  <span className="text-white text-xs mt-2 text-center max-w-[70px]">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= Recommendations ================= */}

      <div className="px-5 sm:px-8 lg:px-14 pb-10">
        <hr className="border-zinc-700 mb-8" />

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Recommendations & Similar Movies
        </h2>

        <HorizontalCards
          title="movie"
          data={
            info.recommendations?.length > 0
              ? info.recommendations
              : info.similar
          }
        />
      </div>

      {/* Trailer Outlet */}
      <Outlet />
    </div>
  );
};

export default Moviedetails;