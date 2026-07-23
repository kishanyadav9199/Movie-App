import { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "MovieZone | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrending();

    if (!wallpaper) {
      getHeaderWallpaper();
    }
  }, [category]);

  if (!wallpaper || !trending) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-[#1F1E24]">
      {/* Sidebar (hidden on mobile) */}
      <Sidenav />

      {/* Main Content */}
      <main className="w-full md:ml-64 lg:ml-72 flex-1 overflow-x-hidden">
     <div className="w-[80%]">
    <Topnav />
  </div>

        <Header data={wallpaper} />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-5 py-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-300">
            Trending
          </h1>

          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </main>
    </div>
  );
};

export default Home;
