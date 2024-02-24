import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MOVIEDB   ||   Trending    " + category.toUpperCase();
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if(data.results.length>0){
        setTrending((prev) => [...prev, ...data.results]);
        setPage(page + 1)
      }else{
        sethasMore(false)
      }
      
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending()
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2vw] pt-4 w-full flex items-center justify-between">
        <h1 className="w-[20%] text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Trending
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={sethasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Trending;
