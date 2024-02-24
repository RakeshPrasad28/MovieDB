import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MOVIEDB   ||   MOVIES    ";

  const getMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      getMovie();
    } else {
      setPage(1);
      setMovie([]);
      getMovie();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2vw] pt-4 w-full flex items-center justify-between">
        <h1 className="w-[30%] text-xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          Movie ({category})
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={movie.length}
        next={getMovie}
        hasMore={sethasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default Movie;
