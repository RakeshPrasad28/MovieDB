import React from "react";
import { Link } from "react-router-dom";

function HorizontalCards({ data}) {
  return (
   
      <div className="w-full flex overflow-x-auto p-5">
        {data.map((d, i) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] mr-4 bg-zinc-800 mb-4 overflow-y-hidden">
            <img
              className="w-full h-[45%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }`}
              alt=""
            />
            <div className="text-white h-[55%]">
              <h1 className="mt-3 text-xl font-semibold ">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p className="text-sm mt-3">
                {d.overview.slice(0, 100)}...
                <span className="text-blue-400">more</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
  );
}

export default HorizontalCards;
