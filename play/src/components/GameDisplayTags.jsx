import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectCoverflow } from "swiper/modules";
import { FiChevronsRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function GameDisplayTags({
  tag = "multiplayer",
  effect = "coverflow",
}) {
  const params = useParams();
  const [display, setDisplay] = useState([]);

  const getDisplay = async () => {
    // const check = localStorage.getItem("grid")
    // if(check){
    // setGrid(JSON.parse(check))
    // } else {
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
    <div className="flex justify-center relative text-text">
      <div className="w-full flex justify-center">
        <div className="w-full gap-8 pt-12">
          <Link
            to={`/category/${tag}`}
            className="w-fit text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semi-bold flex items-end transition-all duration-500 hover:text-textLight"
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1) + " " + "Games"}
            <FiChevronsRight className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" />
          </Link>
          <Swiper
            className="text-center rounded-xl w-full pt-4"
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1025: {
                slidesPerView: 3,
              },
            }}
            pauseOnMouseEnter={true}
            spaceBetween={25}
            mousewheel={true}
            effect={effect}
            modules={[Mousewheel, EffectCoverflow]}
          >
            {display.map((items) => (
              <SwiperSlide
                key={items.id}
                className="bg-backgroundLight shadow-xl rounded-xl transition-all duration-500 hover:bg-backgroundHover"
              >
                <Link to={`/game/${items.id}`}>
                  <img
                    className="p-4 rounded-xl"
                    src={items.background_image}
                    alt=""
                    loading="lazy"
                  />
                  <div className="flex-col flex sm:flex-row justify-center gap-4 items-center pb-4">
                    <h2 className="text-xl">{items.name}</h2>
                    <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
