import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { LuBookmarkPlus } from "react-icons/lu";
import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
// import Person from "../assets/body-2-person.png";

export default function BodyScroll({
  genres,
  speed = 1000,
  mousewheel = true,
}) {
  const [scroll, setScroll] = useState([]);

  const getScroll = async () => {
    // const check = localStorage.getItem("scroll")
    // if(check){
    //   setScroll(JSON.parse(check))
    // } else {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&genres=${genres}&page_size=8`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      // localStorage.setItem("scroll", JSON.stringify(res.results))
      setScroll(res.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
      // }
    }
  };

  useEffect(() => {
    getScroll();
  }, []);
  useEffect(() => {}, [scroll]);

  return (
    <div className="w-full h-3/4 rounded-xl flex flex-col items-center justify-center shadow-md">
      <Swiper
        className="text-center rounded-xl w-11/12"
        slidesPerView={1}
        pauseOnMouseEnter={true}
        spaceBetween={25}
        mousewheel={mousewheel}
        speed={speed}
        autoplay={{
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Mousewheel]}
      >
        {scroll.map((items) => (
          <SwiperSlide
            className="rounded-xl transition-all duration-500 hover:bg-backgroundHover"
            style={{
              background: "linear-gradient(to bottom, #0E181B, #070C0D)",
            }}
            key={items.id}
          >
            <Link to={`/game/${items.id}`}>
              <div className="flex justify-around flex-row xl:flex-row items-center p-4">
                {items.metacritic !== undefined && items.metacritic !== null ? (
                  items.metacritic > 70 ? (
                    <h3
                      id="critic-btn"
                      className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-2xl border-4 p-2 rounded-xl border-green-600 text-green-600 font-bold"
                    >
                      {items.metacritic}
                    </h3>
                  ) : items.metacritic >= 60 && items.metacritic <= 70 ? (
                    <h3
                      id="critic-btn"
                      className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-2xl border-4 p-2 rounded-xl border-yellow-600 text-yellow-600 font-bold"
                    >
                      {items.metacritic}
                    </h3>
                  ) : (
                    <h3
                      id="critic-btn"
                      className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-2xl border-4 p-2 rounded-xl border-red-600 text-red-600 font-bold"
                    >
                      {items.metacritic}
                    </h3>
                  )
                ) : (
                  <h3
                    id="critic-btn"
                    className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-2xl border-4 p-2 rounded-xl border-text text-text font-bold"
                  >
                    No Score
                  </h3>
                )}
                <h1 className="text-text text-xl sm:text-2xl md:text-3xl xl:text-xl font-bold">
                  {items.name}
                </h1>
                <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
              </div>
              <img
                loading="lazy"
                className="rounded-b-xl h-fit"
                src={items.background_image}
                alt=""
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="flex flex-col justify-center items-center text-center relative">
        <h2 className="text-text text-4xl sm:text-5xl md:text-6xl w-3/4 font-bold relative z-20">
          Some Games We Love!
        </h2>
        <img className="absolute w-1/2 z-10" src={Person} alt="" />
        <div className="bg-primary w-full lg:w-3/4 h-full absolute top-0 blur-3xl"></div>
      </div> */}
    </div>
  );
}
