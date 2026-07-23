import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import noimage from "/noimage.jpeg";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";

const TvDetails = () => {
  document.title = "MovieZone | TV Show Details";

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [dispatch, id]);

  if (!info) return <Loading />;

  return (
    <div
      className="min-h-screen px-4 sm:px-8 lg:px-16 py-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,.25),
          rgba(0,0,0,.6),
          rgba(0,0,0,.95)
        ),
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      }}
    >
      {/* ================= Navigation ================= */}

      <nav className="flex flex-wrap items-center gap-6 text-white text-2xl mb-10">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] transition"
        >
          <i className="ri-arrow-left-line"></i>
        </button>

        {info.detail?.homepage && (
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
            className="hover:text-yellow-400 font-semibold"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* ================= TV Details ================= */}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Poster */}

        <div className="w-full lg:w-1/3 xl:w-1/4 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt={info.detail.name}
            className="w-full max-w-sm rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Content */}

        <div className="flex-1 text-white">
          {/* Title */}

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black">
            {info.detail.name ||
              info.detail.original_name ||
              info.detail.title ||
              info.detail.original_title}

            <span className="ml-3 text-xl sm:text-2xl font-semibold text-zinc-300">
              ({info.detail.first_air_date?.split("-")[0] || "Unknown"})
            </span>
          </h1>

          {/* Rating */}

          <div className="flex flex-wrap items-center gap-4 mt-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-lg">
              {(info.detail.vote_average * 10).toFixed()}%
            </div>

            <h2 className="text-xl font-semibold">User Score</h2>

            <span>{info.detail.first_air_date}</span>

            <span>{info.detail.genres?.map((g) => g.name).join(", ")}</span>

            {info.detail.episode_run_time?.length > 0 && (
              <span>{info.detail.episode_run_time[0]} min</span>
            )}
          </div>

          {/* Tagline */}

          <h2 className="italic text-zinc-300 text-lg">
            {info.detail.tagline}
          </h2>

          {/* Overview */}

          <h2 className="text-2xl font-semibold mt-8 mb-3">Overview</h2>

          <p className="leading-8 text-zinc-200">{info.detail.overview}</p>

          {/* Languages */}

          <h2 className="text-2xl font-semibold mt-8 mb-3">
            Available Languages
          </h2>

          <p className="text-zinc-300 mb-10">{info.translations?.join(", ")}</p>

          {/* Trailer */}

          <Link
            to="trailer"
            className="inline-flex items-center gap-3 bg-[#6556CD] hover:bg-[#5747d6] transition px-6 py-3 rounded-lg font-semibold"
          >
            <i className="ri-play-fill text-xl"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* ================= Watch Providers Starts ================= */}

      <div className="mt-12 space-y-8">
        {/* Streaming */}
        {info.watchproviders?.flatrate?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Streaming On
            </h2>

            <div className="flex flex-wrap gap-5">
              {info.watchproviders.flatrate.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex flex-col items-center"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shadow-lg"
                  />
                  <span className="text-xs text-zinc-300 mt-2 text-center">
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
            <h2 className="text-2xl font-semibold text-white mb-4">Rent</h2>

            <div className="flex flex-wrap gap-5">
              {info.watchproviders.rent.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex flex-col items-center"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shadow-lg"
                  />
                  <span className="text-xs text-zinc-300 mt-2 text-center">
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
            <h2 className="text-2xl font-semibold text-white mb-4">Buy</h2>

            <div className="flex flex-wrap gap-5">
              {info.watchproviders.buy.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="flex flex-col items-center"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover shadow-lg"
                  />
                  <span className="text-xs text-zinc-300 mt-2 text-center">
                    {provider.provider_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= Seasons ================= */}

      <hr className="my-10 border-zinc-700" />

      <h2 className="text-3xl font-bold text-white mb-6">Seasons</h2>

      <div className="flex gap-6 overflow-x-auto pb-5 scrollbar-hide">
        {info.detail.seasons?.length > 0 ? (
          info.detail.seasons.map((season) => (
            <div
              key={season.id}
              className="min-w-[180px] sm:min-w-[220px] flex-shrink-0"
            >
              <img
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                    : noimage
                }
                alt={season.name}
                className="w-full h-72 rounded-xl object-cover shadow-xl"
              />

              <h3 className="text-white text-lg font-semibold mt-3">
                {season.name}
              </h3>

              <p className="text-zinc-400 text-sm mt-1">
                Episodes: {season.episode_count}
              </p>

              <p className="text-zinc-500 text-sm">
                {season.air_date || "Coming Soon"}
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-2xl text-white">No Seasons Available</h2>
        )}
      </div>

      {/* ================= Recommendations ================= */}

      <hr className="my-10 border-zinc-700" />

      <h2 className="text-3xl font-bold text-white mb-6">
        Recommendations & Similar Shows
      </h2>

      <HorizontalCards
        data={
          info.recommendations?.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  );
};

export default TvDetails;