import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./partials/HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  document.title = "MovieZone | Person Details";

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.person);

  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1F1E24]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#1F1E24] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6">
      {/* ================= Navigation ================= */}

      <nav className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl md:text-3xl text-white hover:text-[#6556CD] duration-300"
        >
          <i className="ri-arrow-left-line"></i>
        </button>
      </nav>

      {/* ================= Main Layout ================= */}

      <div className="flex flex-col xl:flex-row gap-10">
        {/* ================= Left Section ================= */}

        <div className="w-full xl:w-1/4 flex flex-col">
          {/* Poster */}

          <img
            src={
              info.detail?.profile_path
                ? `https://image.tmdb.org/t/p/w500${info.detail.profile_path}`
                : "/noimage.jpeg"
            }
            alt={info.detail?.name}
            className="w-60 sm:w-72 md:w-80 xl:w-full mx-auto rounded-2xl object-cover shadow-2xl hover:scale-[1.02] duration-300"
          />

          <hr className="border-zinc-700 my-8" />

          {/* ================= Social Links ================= */}

          <div className="flex justify-center xl:justify-start flex-wrap gap-5 text-3xl text-white">
            {info.externalid?.wikidata_id && (
              <a
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300"
              >
                <i className="ri-earth-fill"></i>
              </a>
            )}

            {info.externalid?.facebook_id && (
              <a
                href={`https://facebook.com/${info.externalid.facebook_id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#6556CD] duration-300"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}

            {info.externalid?.instagram_id && (
              <a
                href={`https://instagram.com/${info.externalid.instagram_id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 duration-300"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}

            {info.externalid?.twitter_id && (
              <a
                href={`https://twitter.com/${info.externalid.twitter_id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 duration-300"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* ================= Personal Information ================= */}

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Personal Information
            </h2>

            <div className="space-y-6 text-zinc-300">
              <div>
                <h3 className="text-white font-semibold">Known For</h3>
                <p>{info.detail?.known_for_department || "Unknown"}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Gender</h3>

                <p>
                  {info.detail?.gender === 2
                    ? "Male"
                    : info.detail?.gender === 1
                      ? "Female"
                      : "Not Specified"}
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Birthday</h3>

                <p>{info.detail?.birthday || "Unknown"}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Deathday</h3>

                <p>{info.detail?.deathday || "Still Alive"}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Place of Birth</h3>

                <p>{info.detail?.place_of_birth || "Unknown"}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold">Also Known As</h3>

                <p className="leading-7">
                  {info.detail?.also_known_as?.length
                    ? info.detail.also_known_as.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Right Section ================= */}

        <div className="flex-1 min-w-0">
          {/* Name */}

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-tight mb-6">
            {info.detail?.name}
          </h1>

          {/* Biography */}

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Biography</h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-8 text-justify whitespace-pre-line">
              {info.detail?.biography || "Biography not available."}
            </p>
          </div>

          {/* ================= Known For ================= */}

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-5">Known For</h2>

            <div className="overflow-hidden rounded-xl">
              <HorizontalCards data={info.combinedCredits?.cast || []} />
            </div>
          </div>
          {/* ================= Acting Credits ================= */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Acting Credits</h2>

            <Dropdown
              title="Category"
              options={["movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* ================= Credits List ================= */}

          <div className="bg-[#18181B] border border-zinc-700 rounded-2xl shadow-xl overflow-hidden">
            {info?.[`${category}Credits`]?.cast?.length ? (
              <ul className="max-h-[600px] overflow-y-auto">
                {info[`${category}Credits`].cast.map((credit) => (
                  <li
                    key={credit.id}
                    className="border-b border-zinc-700 last:border-none"
                  >
                    <Link
                      to={`/${category}/details/${credit.id}`}
                      className="block p-4 sm:p-5 hover:bg-[#24242C] duration-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Poster */}

                        <img
                          src={
                            credit.poster_path
                              ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                              : "/noimage.jpeg"
                          }
                          alt={credit.title || credit.name || "Poster"}
                          className="w-24 h-36 rounded-lg object-cover shadow-lg mx-auto sm:mx-0"
                        />

                        {/* Details */}

                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-white">
                            {credit.title ||
                              credit.name ||
                              credit.original_title ||
                              credit.original_name}
                          </h3>

                          {credit.character && (
                            <p className="text-zinc-400 mt-2">
                              <span className="text-white font-medium">
                                Character:
                              </span>{" "}
                              {credit.character}
                            </p>
                          )}

                          {(credit.release_date || credit.first_air_date) && (
                            <p className="text-zinc-500 mt-2">
                              <span className="text-white font-medium">
                                Released:
                              </span>{" "}
                              {credit.release_date || credit.first_air_date}
                            </p>
                          )}

                          {credit.vote_average > 0 && (
                            <div className="mt-3 flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                                <i className="ri-star-fill"></i>

                                {credit.vote_average.toFixed(1)}
                              </div>
                            </div>
                          )}

                          {credit.overview && (
                            <p className="text-zinc-400 mt-4 text-sm leading-6 line-clamp-3">
                              {credit.overview}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-48 text-zinc-400 text-lg">
                No Acting Credits Available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;