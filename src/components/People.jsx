import axios from "../utils/axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Cards from "./partials/Cards";

const People = () => {
  document.title = "MovieZone | People";

  const navigate = useNavigate();

  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPeople = async (pageNo = page) => {
    try {
      const { data } = await axios.get(`/person/popular?page=${pageNo}`);

      if (data.results.length > 0) {
        setPeople((prev) => [...prev, ...data.results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPeople([]);
    setPage(1);
    setHasMore(true);

    getPeople(1);
  }, []);

  if (people.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#1F1E24]">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-10 py-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
        {/* Title */}
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-3xl text-zinc-400 hover:text-[#6556CD] transition"
          >
            <i className="ri-arrow-left-line"></i>
          </button>

          <h1 className="ml-3 text-2xl font-semibold text-zinc-300">People</h1>
        </div>

        {/* Search */}
        <div className="w-full lg:w-1/2">
          <Topnav />
        </div>
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={
          <h1 className="text-center text-white py-6 text-lg">Loading...</h1>
        }
      >
        <Cards data={people} title="person" />
      </InfiniteScroll>
    </div>
  );
};

export default People;
