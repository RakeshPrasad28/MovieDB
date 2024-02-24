
import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
    
  return (
    <div className="w-[20%] h-full  border-r-[1px] border-zinc-300 p-5">
      <h1 className="text-[#6556CD] font-bold text-[1.5vw]">
        <i className="ri-tv-fill mr-3"></i>
        <span>MOVIEDB</span>
      </h1>
      <nav className="flex flex-col text-[1.4vw] text-zinc-400 gap-2">
        <h1 className="text-white font-semibold text-[1.8vw] mt-3">New Feeds</h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200 p-3">
          <i className="ri-fire-fill mr-2"></i>Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200  p-3">
          <i className="ri-bard-fill mr-2"></i>Popular
        </Link>
        <Link to="/movies" className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200  p-3">
          <i className="ri-film-fill mr-2"></i>Movies
        </Link>
        <Link to="/tv-shows" className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200  p-3">
          <i className="ri-movie-fill mr-2"></i>TV Shows
        </Link>
        <Link to="/person" className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200 p-3">
          <i className="ri-user-fill mr-2"></i>People
        </Link>
      </nav>
      <hr className="border-none h-[1px] bg-zinc-300"/>
      <nav className="flex flex-col text-[1.4vw] text-zinc-400 gap-2">
        <h1 className="text-white font-semibold text-[1.7vw] mt-3">Website Information</h1>
        <Link className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200 p-3">
        <i className="ri-bookmark-line mr-2"></i>About
        </Link>
        <Link className="hover:bg-[#6556CD] hover:rounded-lg hover:text-white duration-200  p-3">
        <i className="ri-contacts-line mr-2"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
