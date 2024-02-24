import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";

const People = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MOVIEDB   ||   CAST   ";

  const getPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPerson((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      getPerson();
    } else {
      setPage(1);
      setPerson([]);
      getPerson();
    }
  };
  useEffect(() => {
    refreshHandler();
  }, [category]);
  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="px-[2vw] pt-4 w-full flex items-center justify-between">
        <h1 className="w-[30%] text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
          ></i>
          People
        </h1>
        <Topnav />
      </div>
      <InfiniteScroll
        dataLength={person.length}
        next={getPerson}
        hasMore={sethasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default People;
