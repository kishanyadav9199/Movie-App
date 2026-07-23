import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";

import Moviedetails from "./components/Moviedetails";
import TvDetails from "./components/TvDetails";
import PersonDetails from "./components/PersonDetails";

import Trailer from "./components/partials/Trailer";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/person" element={<People />} />

        {/* Movie */}
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>

        {/* TV */}
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="trailer" element={<Trailer />} />
        </Route>

        {/* Person */}
        <Route path="/person/details/:id" element={<PersonDetails />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
