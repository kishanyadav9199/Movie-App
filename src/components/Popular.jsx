import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";

const Popular = () => {
  document.title = "MovieZone | Popular";

  const navigate = useNavigate();

  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPopular = async (pageNo = page) => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${pageNo}`);

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPopular([]);
    setPage(1);
    setHasMore(true);

    getPopular(1);
  }, [category]);

  if (popular.length === 0) {
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

          <h1 className="ml-3 text-2xl font-semibold text-zinc-300">Popular</h1>
        </div>

        {/* Right */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full lg:w-auto">
          <div className="flex-1">
            <Topnav />
          </div>

          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Cards */}
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={
          <h1 className="text-center text-white py-6 text-lg">Loading...</h1>
        }
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  );
};

export default Popular;
