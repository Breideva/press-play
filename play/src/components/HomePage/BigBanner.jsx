import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuBookmarkPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function BigBanner({ name }) {
  const [banner, setBanner] = useState({});
  const [screenshot, setScreenshot] = useState([])

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
      const ssRes = await ssReq.json()
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
        <Link
        to={`/game/${banner.id}`}
          key={banner.id}
          className="bg-backgroundLight w-full block rounded-xl p-8 transition-transform duration-700 shadow-xl hover:bg-backgroundHover hover:scale-105"
        >
          <img
            className="w-fit rounded-xl"
            src={banner.background_image}
            loading="lazy"
            alt=""
          />
          <div className="flex gap-2 my-2">
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
          </div>
          <div className="flex gap-4 items-center justify-center my-4">
            <h2 className="text-xl sm:text-3xl md:4xl xl:text-5xl font-bold">
              {banner.name}
            </h2>

            <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
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
                  <p>{item.name}{index < banner.genres.length - 1 && ", "}</p>
                  
                </div>
              ))}
            </div>
          </div>
        </Link>
      {/* ))} */}
    </div>
  );
}
