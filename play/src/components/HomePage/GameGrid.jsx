import React from "react";
import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { LuBookmarkPlus } from "react-icons/lu";
import { Link } from "react-router-dom";


export default function GameGrid() {
  const [grid, setGrid] = useState([]);
  const [size, setSize] = useState(8);
  const [button, setButton] = useState("Show More");

  const addSize = () => {
    if (size < 24) {
      setSize((prevSize) => prevSize + 8);
    } else {
      setButton("All Loaded");
      return;
    }
  };

  const getGrid = async () => {
    // const check = localStorage.getItem("grid")
    // if(check){
    // setGrid(JSON.parse(check))
    // } else {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&genres=7&page_size=${size}`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      // localStorage.setItem("grid", JSON.stringify(res.results))
      setGrid(res.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
    }
    // }
  };

  useEffect(() => {
    getGrid();
  }, [size]);

  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col gap-8 text-center lg:text-start justify-center items-center pt-14 mb-20">
          <div className="w-full flex flex-col sm:flex-row justify-center gap-4 items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Search Genres</h2>
            <form
              className="w-full md:w-1/2 group p-2 rounded-xl flex items-center transition-all duration-500 hover:bg-backgroundHover bg-backgroundLight focus-within:bg-backgroundHover"
              action=""
            >
              <HiMagnifyingGlass className="w-10 h-10 py-2 pl-2 text-2xl rounded-l-3xl text-text" />
              <input
              placeholder="E.g. Action, Indie, Scary"
                className="pl-2 w-full h-full text-text outline-none text-xl rounded-xl transition-all bg-transparent duration-500 bg-opacity-0 group-bg-text group-focus-within:bg-opacity-100"
                type="text"
              />
            </form>
          </div>
          <div className="text-text grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center text-center w-full">
            {grid.map((items) => (
              <Link to={`/game/${items.id}`} key={items.id}>
                <div className="bg-backgroundLight  shadow-xl rounded-xl transition-all duration-500 hover:bg-backgroundHover hover:scale-105">
                  <img
                    className="p-4 rounded-xl"
                    src={items.background_image}
                    alt=""
                  />
                  <div className="flex-col flex sm:flex-row justify-center gap-4 items-center pb-4">
                  <h2 className="text-xl">{items.name}</h2>
                  <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
                </div>
                </div>
              </Link>
            ))}
          </div>
          <div>
            <button
              className="p-4 bg-backgroundLight rounded-xl shadow-xl transition-all duration-500 hover:scale-105 hover:bg-backgroundHover"
              onClick={addSize}
            >
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
