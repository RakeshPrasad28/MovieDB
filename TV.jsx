import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const TV = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MOVIEDB   ||   TV SHOWS    ";

  const getTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      getTv();
    } else {
      setPage(1);
      setTv([]);
      getTv();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return tv.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2vw] pt-4 w-full flex items-center justify-between">
        <h1 className="w-[30%] text-xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          TV-Shows ({category})
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "on_the_air", "top_rated", "airing_today"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={tv.length}
        next={getTv}
        hasMore={sethasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default TV;
