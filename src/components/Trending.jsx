import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "MovieZone | Trending";

  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getTrending = async (pageNo = page) => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${pageNo}`,
      );

      if (data.results.length > 0) {
        setTrending((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTrending([]);
    setPage(1);
    setHasMore(true);

    getTrending(1);
  }, [category, duration]);

  if (trending.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#1F1E24]">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-10 py-5 flex flex-col lg:flex-row justify-between gap-5">
        {/* Left */}
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-3xl text-zinc-400 hover:text-[#6556CD] transition"
          >
            <i className="ri-arrow-left-line"></i>
          </button>

          <h1 className="ml-3 text-2xl font-semibold text-zinc-300">
            Trending
          </h1>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full lg:w-auto">
          <div className="flex-1">
            <Topnav />
          </div>

          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />

          <Dropdown
            title="Duration"
            options={["day", "week"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      {/* Trending Cards */}
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={
          <h1 className="text-center text-white py-6 text-lg">Loading...</h1>
        }
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  );
};

export default Trending;
