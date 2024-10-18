import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuBookmarkPlus } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function BigBanner({ genres = 6 }) {
  const [banner, setBanner] = useState([]);

  const getBanner = async () => {
    // const check = localStorage.getItem("banner-one");
    // if (check) {
    //   setBanner(JSON.parse(check));
    // } else {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&genres=${genres}&page_size=1`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      // localStorage.setItem("banner-one", JSON.stringify(res.results));
      setBanner(res.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
      // }
    }
  };

  useEffect(() => {
    getBanner();
  }, []);
  useEffect(() => {
    // console.log(banner[0].id)
  }, [banner]);

  return (
    <div className="w-11/12 lg:w-5/12 z-20 pb-8">
      {banner.map((items) => (
        <Link
        to={`/game/${items.id}`}
          key={items.id}
          className="bg-backgroundLight w-full block rounded-xl p-8 transition-transform duration-700 shadow-xl hover:bg-backgroundHover hover:scale-105"
        >
          <img
            className="w-fit rounded-xl"
            src={items.background_image}
            loading="lazy"
            alt=""
          />
          <div className="flex gap-2 my-2">
            {items.short_screenshots.map((item) => (
              <div key={item.id} className="flex">
                <img
                  className="hover:scale-105 transition-transform duration-300 h-fit"
                  src={item.image}
                  loading="lazy"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center justify-center my-4">
            <h2 className="text-xl sm:text-3xl md:4xl xl:text-5xl font-bold">
              {items.name}
            </h2>

            <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
          </div>
          <div className="grid grid-col-1 justify-center items-center gap-y-2 my-8 text-md sm:text-xl md:text-2xl font-light">
            <p>
              <span className="text-lg sm:text-2xl md:text-3xl font-semibold">
                Released:
              </span>{" "}
              {items.released}
            </p>
            <p className="flex items-center">
              <span className="text-lg sm:text-2xl md:text-3xl font-semibold mr-2">
                Rating:
              </span>{" "}
              {items.rating}
              <FaStar className="text-yellow-500" />({items.reviews_count})
            </p>
            <p>
              <span className="text-lg sm:text-2xl md:text-3xl font-semibold">
                Downloads:
              </span>{" "}
              {items.added.toLocaleString()}
            </p>
            <div className="flex flex-wrap gap-1 items-end">
              <p className="mr-1">
                <span className="text-lg sm:text-2xl md:text-3xl font-semibold">
                  Genres:
                </span>
              </p>
              {items.genres.map((item, index) => (
                <div key={item.id} className="flex">
                  <p>{item.name}{index < items.genres.length - 1 && ", "}</p>
                  
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
