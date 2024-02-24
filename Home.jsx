import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import axios from "../utils/axios";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const Home = () => {
  document.title = "MOVIEDB | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);
  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-y-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="p-7 flex justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>setCategory(e.target.value)}/>
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default Home;
