import React from "react";
import person from "../assets/body-1-person.png";
import circles from "../assets/body-1-circles.png";
import Recommend from "./Recommend";

export default function Header() {
  return (
    <div className="flex justify-center ">
      <div className="w-full fixed flex justify-center">
        <div className="w-9/12 justify-center flex flex-col sm:flex-row gap-14 sm:gap-0 items-center mt-20">
          <div className="relative w-3/4 sm:w-1/2">
            <img className="absolute z-20" src={person} alt="" />
            <img className="z-10 relative" src={circles} alt="" />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-center gap-y-6 sm:gap-y-12 items-center text-center font-semibold relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl relative z-20 font-bold">
              Discover and save your favorite games in one place.
            </h1>
            <div className="flex items-center gap-8 sm:gap-6 md:gap-10 lg:gap-14">
              <div className="relative group flex">
                <button className="relative text-2xl lg:text-3xl z-10 text-text bg-background p-4 rounded-lg border-b-2 border-secondaryLight transition-all duration-500 group-hover:text-background group-hover:bg-text">
                  Games
                </button>
                <div className="bg-secondary w-full h-full absolute top-0 blur-2xl"></div>
              </div>
              <button className="text-2xl lg:text-3xl p-3 border-4 border-secondary text-secondary shadow-xl rounded-lg transition-all duration-500 hover:border-secondaryLight hover:text-secondaryLight">
                Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
