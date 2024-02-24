import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MOVIEDB   ||   Popular    " + category.toUpperCase();

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setPage(1);
      setPopular([]);
      getPopular();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2vw] pt-4 w-full flex items-center justify-between">
        <h1 className="w-[20%] text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Popular
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={sethasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Popular;
