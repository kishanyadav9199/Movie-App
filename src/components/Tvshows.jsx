import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Tvshows = () => {
  document.title = "MovieZone | TV Shows";

  const navigate = useNavigate();

  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTvShows = async (pageNo = page) => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${pageNo}`);

      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    setTv([]);
    setPage(1);
    setHasMore(true);

    getTvShows(1);
  }, [category]);

  if (tv.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#1F1E24]">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-10 py-5 flex flex-col lg:flex-row justify-between gap-5">
        {/* Left */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-3xl text-zinc-400 hover:text-[#6556CD] transition"
          >
            <i className="ri-arrow-left-line"></i>
          </button>

          <h1 className="text-2xl font-semibold text-zinc-300">TV Shows</h1>

          <span className="text-sm text-zinc-500 capitalize">
            ({category.replaceAll("_", " ")})
          </span>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full lg:w-auto">
          <div className="flex-1">
            <Topnav />
          </div>

          <Dropdown
            title="Category"
            options={["airing_today", "on_the_air", "popular", "top_rated"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* TV Shows */}
      <InfiniteScroll
        dataLength={tv.length}
        next={getTvShows}
        hasMore={hasMore}
        loader={
          <h1 className="text-center text-white py-6 text-lg">Loading...</h1>
        }
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  );
};

export default Tvshows;
