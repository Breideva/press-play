import Person from "../../assets/body-3-person.png";
import Circles from "../../assets/body-2-circles.png";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/autoplay";

export default function SecondBody() {
  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col gap-0 sm:gap-8 sm:flex-row text-center lg:text-start justify-center items-center pt-14 mb-20">
          <div className="w-full sm:w-1/2 flex flex-col gap-y-2 lg:gap-y-4">
            <h2 className="text-4xl lg:text-4xl xl:text-8xl relative z-20 font-bold">
              Find a game that matches your playstyle.
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl font-normal pt-2 pb-4">
              Looking for the perfect game that suits your preferences? Explore
              a wide range of games specifically designed to align with your
              individual playstyle.
            </p>
            <Swiper
              className="text-center rounded-xl w-full"
              slidesPerView={1}
              pauseOnMouseEnter={true}
              speed={1000}
              loop={true}
              effect="flip"
              allowTouchMove={false}
              autoplay={{
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay, EffectFlip]}
            >
              <SwiperSlide className="">
                <Link to="/category/horror" className="z-30 block w-full my-2 text-2xl lg:text-3xl p-3 border-4 italic border-primary text-primary shadow-xl rounded-lg transition-transform duration-700 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95">
                Horror Games
                </Link>
              </SwiperSlide>
              <SwiperSlide className="">
                <Link to="/category/2d" className="z-30 block w-full my-2 text-2xl lg:text-3xl p-3 border-4 italic border-primary text-primary shadow-xl rounded-lg transition-transform duration-700 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95">
                2D Games
                </Link>
              </SwiperSlide>
              <SwiperSlide className="">
                <Link to="/category/difficult" className="z-30 block w-full my-2 text-2xl lg:text-3xl p-3 border-4 italic border-primary text-primary shadow-xl rounded-lg transition-transform duration-700 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95">
                Difficult Games
                </Link>
              </SwiperSlide>
              <SwiperSlide className="">
                <Link to="/category/exploration" className="z-30 block w-full my-2 text-2xl lg:text-3xl p-3 border-4 italic border-primary text-primary shadow-xl rounded-lg transition-transform duration-700 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95">
                Exploration Games
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="relative w-1/2 sm:w-1/2">
            <img className="absolute z-20" src={Person} alt="" />
            <img className="relative z-10 " src={Circles} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
