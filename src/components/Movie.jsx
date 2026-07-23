import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Movie = () => {
  document.title = "MovieZone | Movies";

  const navigate = useNavigate();

  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getMovie = async (pageNo = page) => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${pageNo}`);

      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setMovie([]);
    setPage(1);
    setHasMore(true);

    getMovie(1);
  }, [category]);

  if (movie.length === 0) return <Loading />;

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
            Movies
            <span className="ml-2 text-sm text-zinc-500">
              ({category.replace("_", " ")})
            </span>
          </h1>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full lg:w-auto">
          <div className="flex-1">
            <Topnav />
          </div>

          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        loader={<h1 className="text-center text-white py-6">Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  );
};

export default Movie;
