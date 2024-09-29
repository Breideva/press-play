import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LuBookmarkPlus } from "react-icons/lu";
import { EffectCoverflow, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Person from "../assets/body-2-person.png";

export default function BodyScroll() {
  const [scroll, setScroll] = useState([]);

  const getScroll = async () => {
    const check = localStorage.getItem("scroll")
    if(check){
      setScroll(JSON.parse(check))
    } else {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&genres=7&page_size=8`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      localStorage.setItem("scroll", JSON.stringify(res.results))
      setScroll(res.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
    }
  }
  };

  useEffect(() => {
    getScroll();
  }, []);
  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
      <Swiper
        className="text-center w-full lg:w-3/4"
        slidesPerView={2}
        breakpoints={{
          1022: {
            slidesPerView: 1,
          },
        }}
        mousewheel={true}
        navigation
        effect="coverflow"
        modules={[EffectCoverflow, Navigation, Mousewheel]}
      >
        {scroll.map((items) => (
          <SwiperSlide
            className="bg-backgroundLight rounded-xl shadow-md"
            key={items.id}
          >
            <div className="flex flex-col md:flex-row justify-around items-center p-4">
              {items.metacritic !== undefined && items.metacritic !== null ? (
                items.metacritic > 70 ? (
                  <h3
                    id="critic-btn"
                    className=" text-md sm:text-lg md:text-3xl lg:text-2xl border-4 p-2 rounded-xl border-green-600 text-green-600 font-bold"
                  >
                    {items.metacritic}
                  </h3>
                ) : (
                  <h3
                    id="critic-btn"
                    className="border-4 p-2 rounded-xl border-red-600 text-red-600 font-bold"
                  >
                    {items.metacritic}
                  </h3>
                )
              ) : (
                <h3
                  id="critic-btn"
                  className="border-4 p-2 rounded-xl border-text text-text font-bold"
                >
                  No Score
                </h3>
              )}
              <h1 className="text-text text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold">
                {items.name}
              </h1>
              <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-secondary transition-all duration-500 hover:text-secondaryLight" />
            </div>
            <img className="rounded-b-xl" src={items.background_image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="flex flex-col justify-center items-center text-center relative">
        <h2 className="text-text text-4xl sm:text-5xl md:text-6xl w-3/4 font-bold relative z-20">
          Some Games We Love!
        </h2>
        <img className="absolute w-1/2 z-10" src={Person} alt="" />
        <div className="bg-secondary w-full lg:w-3/4 h-full absolute top-0 blur-3xl"></div>
      </div> */}
    </div>
  );
}
