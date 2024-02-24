import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removeMovie } from "../store/actions/movieActions";

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removeMovie());
    };
  }, []);
  return info ?(
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen px-[10%]"
    >
      <nav className="w-full text-zinc-400">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line mr-2 cursor-pointer"
        ></Link>
        <a href="">
          <i class="ri-external-link-line"></i>
        </a>
        <a href="">
          <i class="ri-earth-fill"></i>
        </a>
        <a href="">imdb</a>
      </nav>
    </div>
  ):<h1 className="text-2xl text-white text-center">Loading</h1>
};

export default MovieDetails;
