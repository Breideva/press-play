import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuBookmarkPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Context } from "../../context/ProfileContext";
import { FaCheck } from "react-icons/fa6";

export default function BigBanner({ name }) {
  const { setResult, getGameId, isActive, changeActive } = useContext(Context);

  const [banner, setBanner] = useState({});
  const [screenshot, setScreenshot] = useState([]);

  const getBanner = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games/${name}?key=${apiKey}`
      );
      const ssReq = await fetch(
        `https://api.rawg.io/api/games/${name}/screenshots?key=${apiKey}`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const ssRes = await ssReq.json();
      const res = await req.json();
      setBanner(res);
      setScreenshot(ssRes.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);
  useEffect(() => {
    console.log(screenshot);
  }, [banner]);

  return (
    <div className="w-11/12 lg:w-5/12 z-20 pb-8">
      <div
        key={banner.id}
        className="bg-backgroundLight w-full block rounded-xl p-8 transition-transform duration-700 shadow-xl hover:bg-backgroundHover hover:scale-105"
      >
        <Link to={`/game/${banner.id}`}>
          <img
            className="w-fit rounded-xl"
            src={banner.background_image}
            loading="lazy"
            alt=""
          />
        </Link>
        <Link to={`/game/${banner.id}`} className="flex gap-2 my-2">
          {screenshot.map((items) => (
            <div key={items.id} className="flex">
              <img
                className="hover:scale-105 transition-transform duration-300 h-fit"
                src={items.image}
                loading="lazy"
                alt=""
              />
            </div>
          ))}
        </Link>
        <div className="flex items-center justify-center gap-4">
          <Link
            to={`/game/${banner.id}`}
            className="text-xl sm:text-3xl md:4xl xl:text-5xl font-bold"
          >
            {banner.name}
          </Link>
          <div>
            {isActive.includes(banner?.id) ||
            (localStorage.getItem("checks") &&
              localStorage.getItem("checks").includes(banner?.id)) ? (
              <div>
                <FaCheck
                  className="text-2xl sm:text-3xl md:text-4xl
                 text-primary transition-all cursor-pointer duration-500 hover:text-secondary"
                />
              </div>
            ) : (
              <div>
                <LuBookmarkPlus
                  onClick={() => {
                    setResult(getGameId(banner));
                    changeActive(banner);
                  }}
                  className="text-2xl sm:text-3xl md:text-4xl
                  text-primary transition-all cursor-pointer duration-500 hover:text-secondary"
                />
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-col-1 justify-center items-center gap-y-2 my-8 text-md sm:text-xl md:text-2xl font-light">
          <p>
            <span className="text-lg sm:text-2xl md:text-3xl font-semibold">
              Released:
            </span>{" "}
            {banner.released}
          </p>
          <p className="flex items-center">
            <span className="text-lg sm:text-2xl md:text-3xl font-semibold mr-2">
              Rating:
            </span>{" "}
            {banner.rating}
            <FaStar className="text-yellow-500" />({banner.reviews_count})
          </p>
          <p>
            <span className="text-lg sm:text-2xl md:text-3xl font-semibold">
              Downloads:
            </span>{" "}
            {banner?.added?.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-1 items-end">
            <p className="mr-1">
              <span className="text-lg sm:text-2xl md:text-3xl font-semibold">
                Genres:
              </span>
            </p>
            {banner?.genres?.map((item, index) => (
              <div key={item.id} className="flex">
                <p>
                  {item.name}
                  {index < banner.genres.length - 1 && ", "}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
