import React, { useEffect } from "react";
import person from "../../assets/body-1-person.png";
import circles from "../../assets/body-1-circles.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-center bg-background">
      <div className="w-full flex justify-center">
        <div className="w-9/12 justify-center flex flex-col sm:flex-row gap-14 sm:gap-0 items-center mt-20 sm:mt-30 xl:mt-20 md:mt-40 mb-20 sm:mb-30 md:mb-40 ">
          <div className="relative w-3/4 sm:w-1/2">
            <img className="absolute z-20" src={person} alt="" />
            <img className="z-10 relative" src={circles} alt="" />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-center gap-y-6 sm:gap-y-12 items-center text-center font-semibold relative">
            <h1 className="text-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl relative z-20 font-bold">
              Discover and save your favorite games in one place.
            </h1>
            <div className="flex items-center gap-8 sm:gap-6 md:gap-10 lg:gap-14">
              <div className="relative group flex">
                <Link
                  to="/main/Games"
                  className="relative text-2xl lg:text-3xl z-10 text-text bg-background p-4 rounded-lg border-b-2 border-primary transition-transform duration-700 group-hover:text-background group-hover:bg-text hover:scale-105 active:scale-95"
                >
                  Games
                </Link>
                <div className="bg-primary w-full h-full absolute top-0 blur-2xl"></div>
              </div>
              <Link
                to="/search/games"
                className="text-2xl lg:text-3xl p-3 border-4 border-primary text-primary shadow-xl rounded-lg transition-transform duration-700 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95"
              >
                Favorites
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
