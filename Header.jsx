import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[65vh] flex flex-col justify-end items-start px-[7%] pb-[5%] text-zinc-200"
    >
      <h1 className="w-[50%] text-[3vw] font-semibold ">
        {data.original_title || data.title || data.name || data.original_name}
      </h1>
      <p className="w-[50%]  text-[1.2vw]">
        {data.overview.slice(0, 180)}
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-600 cursor-pointer">...more</Link>
      </p>
      <p className="flex gap-x-2">
        <i className="text-yellow-400 ri-megaphone-fill"></i>{data.release_date || "No Information"}
        <i className="text-yellow-400 ri-disc-fill"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className="px-5 py-2 mt-2 font-bold text-white bg-[#51518f] rounded-lg hover:bg-zinc-600 hover:text-[#11111f]">Watch Trailer</Link>
    </div>
  );
};

export default Header;
