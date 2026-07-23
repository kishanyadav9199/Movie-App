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

  if (!info) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-[#1F1E24] px-4 sm:px-8 lg:px-16 py-6">
      {/* ================= Navigation ================= */}

      <nav className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-3xl text-white hover:text-[#6556CD] transition"
        >
          <i className="ri-arrow-left-line"></i>
        </button>
      </nav>

      {/* ================= Main Layout ================= */}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ================= Left Section ================= */}

        <div className="w-full lg:w-1/4">
          {/* Poster */}

          <img
            className="w-full max-w-[320px] mx-auto rounded-xl shadow-2xl object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={info.detail.name}
          />

          <hr className="my-8 border-zinc-700" />

          {/* Social Links */}

          <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-3xl text-white">
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

            {info.externalid?.facebook_id && (
              <a
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6556CD]"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}

            {info.externalid?.instagram_id && (
              <a
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6556CD]"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}

            {info.externalid?.twitter_id && (
              <a
                href={`https://twitter.com/${info.externalid.twitter_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6556CD]"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Info */}

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Personal Information
            </h2>

            <div className="space-y-5 text-zinc-300">
              <div>
                <h3 className="font-semibold text-white">Known For</h3>
                <p>{info.detail.known_for_department}</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Gender</h3>

                <p>
                  {info.detail.gender === 2
                    ? "Male"
                    : info.detail.gender === 1
                      ? "Female"
                      : "Not Specified"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Birthday</h3>

                <p>{info.detail.birthday || "Unknown"}</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Deathday</h3>

                <p>{info.detail.deathday || "Still Alive"}</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Place of Birth</h3>

                <p>{info.detail.place_of_birth || "Unknown"}</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">Also Known As</h3>

                <p className="leading-7">
                  {info.detail.also_known_as?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Right Section Starts ================= */}

        <div className="flex-1">
          {/* Person Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6">
            {info.detail.name}
          </h1>

          {/* Biography */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Biography
            </h2>

            <p className="text-zinc-300 leading-8 whitespace-pre-line">
              {info.detail.biography || "Biography not available."}
            </p>
          </div>

          {/* Known For */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Known For
            </h2>

            <HorizontalCards data={info.combinedCredits?.cast || []} />
          </div>

          {/* Acting Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <h2 className="text-2xl font-semibold text-white">
              Acting Credits
            </h2>

            <Dropdown
              title="Category"
              options={["movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Acting List */}
          <div className="max-h-[500px] overflow-y-auto rounded-xl border border-zinc-700 bg-[#18181B] shadow-lg">
            {info[`${category}Credits`]?.cast?.length > 0 ? (
              <ul>
                {info[`${category}Credits`].cast.map((credit, index) => (
                  <li
                    key={index}
                    className="border-b border-zinc-700 last:border-none"
                  >
                    <Link
                      to={`/${category}/details/${credit.id}`}
                      className="block p-4 hover:bg-[#24242C] transition"
                    >
                      <h3 className="text-white font-semibold text-lg">
                        {credit.name ||
                          credit.title ||
                          credit.original_name ||
                          credit.original_title}
                      </h3>

                      {credit.character && (
                        <p className="text-zinc-400 mt-1 text-sm">
                          Character: {credit.character}
                        </p>
                      )}

                      {credit.release_date && (
                        <p className="text-zinc-500 text-sm mt-1">
                          Release: {credit.release_date}
                        </p>
                      )}

                      {credit.first_air_date && (
                        <p className="text-zinc-500 text-sm mt-1">
                          First Air Date: {credit.first_air_date}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-zinc-400">
                No credits available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;