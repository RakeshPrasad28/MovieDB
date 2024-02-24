import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full justify-center px-[2vw] mt-10 bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${data.media_type || title}/details/${c.id}`} className="relative w-[35vh] mr-[2%] mb-[3%]" key={i}>
          <img
            className="w-full h-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-lg text-center text-white font-semibold">
            {c.original_title || c.title || c.name || c.original_name}
          </h1>
          {c.vote_average && (
            <div className="bg-yellow-500 rounded-full text-white w-[6vh] h-[6vh] flex justify-center items-center absolute -right-[10%] bottom-[20%]">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
