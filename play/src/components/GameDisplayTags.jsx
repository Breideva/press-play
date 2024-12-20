import { useContext, useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectCoverflow } from "swiper/modules";
import { FiChevronsRight } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Context } from "../context/ProfileContext";

export default function GameDisplayTags({
  tag = "multiplayer",
  effect = "coverflow",
}) {
  const params = useParams();
  const [display, setDisplay] = useState([]);
  const { setResult, getGameId, isActive, changeActive } = useContext(Context);

  // const search = localStorage.getItem("checks");

  // useEffect(() => {
  //   console.log(JSON.stringify(isActive));
  // }, [isActive]);
  // useEffect(() => {
  //   console.log(display.length);
  // }, [isActive]);

  const getDisplay = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&tags=${tag}&page_size=6`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      // localStorage.setItem("grid", JSON.stringify(res.results))
      setDisplay(res.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
    }
    // }
  };

  useEffect(() => {
    getDisplay(params.content);
  }, [params.content]);

  return (
    <div className="w-full justify-center relative text-text bg-transparent col-span-1">
        <div className="pt-12">
          {/* <Link
            to={`/category/${tag}`}
            className="w-fit py-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semi-bold flex items-end transition-all duration-500 hover:text-textLight"
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1) + " " + "Games"}
            <FiChevronsRight className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
          </Link> */}
          <Swiper
            className="text-center h-full"
            slidesPerView={1.5}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1025: {
                slidesPerView: 3.5,
              },
            }}
            loop={true}
            centeredSlides={true}
            mousewheel={true}
            spaceBetween={10}
            effect={effect}
            modules={[Mousewheel, EffectCoverflow]}
          >
            {display.map((items, index) => (
              <SwiperSlide key={index} className="transition-all duration-500">
                <Link to={`/game/${items.id}`}>
                  <img
                    className="hover:opacity-50 transition-all duration-300"
                    src={items.background_image}
                    alt=""
                    loading="lazy"
                  />
                </Link>
                {isActive.includes(items.id) ||
                localStorage.getItem("checks").includes(items.id) ? (
                  <div className="flex-col flex sm:flex-row justify-center gap-4 items-center">
                    <Link className="text-xl w-fit">{items.name}</Link>
                    <FaCheck
                      className="text-2xl sm:text-3xl md:text-3xl
                 text-primary transition-all cursor-pointer duration-500 hover:text-secondary"
                    />
                  </div>
                ) : (
                  <div className="flex-col flex sm:flex-row justify-center gap-4 items-center pb-4">
                    <Link className="text-xl w-fit">{items.name}</Link>
                    <LuBookmarkPlus
                      onClick={() => {
                        setResult(getGameId(items));
                        changeActive(items);
                      }}
                      className="text-2xl sm:text-3xl md:text-4xl
                  text-primary transition-all cursor-pointer duration-500 hover:text-secondary"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
    </div>
  );
}
