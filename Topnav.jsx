import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimg from '../../../public/noimg.webp'

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex items-center mx-auto">
      <i className="text-zinc-400 text-2xl ri-search-line cursor-pointer"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] mx-5 p-3 text-xl outline-none border-none bg-transparent text-zinc-200"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-zinc-400 text-2xl ri-close-fill cursor-pointer"
        ></i>
      )}
      <div className="z-[1000] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[90%] left-[5%] overflow-auto rounded-md">
        {searches.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="hover:text-black hover:bg-zinc-300 duration-300 w-full px-4 py-2 text-zinc-600 font-semibold gap-2 flex justify-start items-center border-b-[1px] border-zinc-400">
            <img className="w-[16vh] h-[12vh] object-cover" src={s.backdrop_path || s.profile_path ?`https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`: noimg} alt="" />
            <span>{s.original_title || s.title || s.name || s.original_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
