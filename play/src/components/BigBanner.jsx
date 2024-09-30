import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuBookmarkPlus } from "react-icons/lu";

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
  }, [banner]);

  return (
    <div className="w-full lg:w-1/2 z-20">
      {banner.map((items) => (
        <div
          key={items.id}
          className="bg-backgroundLight w-full rounded-xl p-8 transition-transform duration-700 shadow-xl hover:bg-backgroundHover hover:scale-105"
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
                  className="hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  loading="lazy"
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center justify-center my-4">
            <h2 className="text-2xl sm:text-4xl md:5xl xl:text-6xl font-bold">
              {items.name}
            </h2>

            <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
          </div>
          <div className="grid grid-col-1 justify-center items-center gap-y-2 my-8 text-md sm:text-lg md:xl">
            <p>
              <span className="text-lg sm:text-2xl md:3xl font-semibold">
                Released:
              </span>{" "}
              {items.released}
            </p>
            <p className="flex items-center">
              <span className="text-lg sm:text-2xl md:3xl font-semibold mr-2">
                Rating:
              </span>{" "}
              {items.rating}
              <FaStar className="text-yellow-500" />({items.reviews_count})
            </p>
            <p>
              <span className="text-lg sm:text-2xl md:3xl font-semibold">
                Downloads:
              </span>{" "}
              {items.added.toLocaleString()}
            </p>
            <div className="flex flex-wrap gap-1 items-center">
              <p className="mr-1">
                <span className="text-lg sm:text-2xl md:3xl font-semibold">
                  Genres:
                </span>
              </p>
              {items.genres.map((item, index) => (
                <div key={item.id} className="flex">
                  <p>{item.name}</p>
                  {index < items.genres.length - 1 && ", "}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
