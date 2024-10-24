import React from "react";
import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { LuBookmarkPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";

export default function GameGrid({
  width,
  tag,
  title = tag.charAt(0).toUpperCase() + tag.slice(1) + " " + "Games",
}) {
  const [grid, setGrid] = useState([]);
  const [size, setSize] = useState(8);
  const [button, setButton] = useState("Show More");
  const [gridCon, setGridCon] = useState(null);

  // const addInfo = () => {
  //   setGridCon(!gridCon);
  // };

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
        `https://api.rawg.io/api/games?key=${apiKey}&tags=${tag}&page_size=${size}`
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
  useEffect(() => {
    console.log(grid);
  }, [grid]);

  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div
          className={`w-${width} flex flex-col gap-8 text-center lg:text-start justify-center items-center pt-14 mb-20`}
        >
          {/* <div className="w-full flex flex-col sm:flex-row justify-center gap-4 items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Search tags
            </h2>
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
          </div> */}
          <div className="w-full">
            <Link
              to={`/category/${tag}`}
              className="flex w-fit justify-start items-center
            text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semi-bold transition-all duration-500 hover:text-textLight"
            >
              {title}
              {/* <FiChevronsRight className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" /> */}
            </Link>
          </div>

          <div className="text-text grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center text-center w-full">
            {grid.map((items) =>
              gridCon === items.id ? (
                <Link
                  to={`/game/${items.id}`}
                  key={items.id}
                  onMouseLeave={() => setGridCon(null)}
                  className="transition-all duration-500"
                >
                  <div className="bg-backgroundLight relative shadow-xl rounded-t-xl transition-all duration-100 hover:bg-backgroundHover hover:scale-105">
                    <img
                      className="p-4 rounded-xl"
                      src={items.background_image}
                      loading="lazy"
                      alt=""
                    />
                    <div className="flex-col flex sm:flex-row justify-center gap-4 items-center pb-4">
                      <h2 className="text-xl">{items.name}</h2>
                      <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
                    </div>
                    <div
                      className="flex flex-col items-center transition-all duration-300 top-full absolute w-full rounded-b-xl bg-backgroundHover"
                      // style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}
                    >
                      <div className="flex justify-between items-center w-full">
                        <p className="py-2 px-4">Score:</p>
                        <div className="flex items-center py-2 px-4">
                          <p>{items.rating}</p>
                          <FaStar className="text-yellow-500" />
                          <p>({items.ratings_count})</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="py-2 px-4">Genre:</p>
                        <div className="flex flex-wrap gap-1 py-2 px-4">
                          {items.genres.map((item, index) => (
                            <div className="flex flex-wrap" key={index}>
                              <p>
                                {item.name}
                                {index < items.genres.length - 1 && (
                                  <span>,</span>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="py-2 px-4">Rating:</p>
                        <div>
                          <p className="py-2 px-4">
                            {items?.esrb_rating?.name || <p>No data</p>}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="py-2 px-4">Released:</p>
                        <div>
                          <p className="py-2 px-4">{items.released}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  // to={`/game/${items.id}`}
                  key={items.id}
                  onMouseEnter={() => setGridCon(items.id)}
                  className="transition-all duration-500"
                >
                  <div className="bg-backgroundLight shadow-xl rounded-xl transition-all duration-500 hover:bg-backgroundHover hover:scale-105">
                    <img
                      className="p-4 rounded-xl"
                      src={items.background_image}
                      loading="lazy"
                      alt=""
                    />
                    <div className="flex-col flex sm:flex-row justify-center gap-4 items-center pb-4">
                      <h2 className="text-xl">{items.name}</h2>
                      <LuBookmarkPlus className="text-2xl sm:text-3xl md:text-4xl text-primary transition-all duration-500 hover:text-secondary" />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
          <div>
            <button
              className="p-4 mt-4 bg-backgroundLight rounded-xl shadow-xl transition-all duration-500 hover:scale-105 hover:bg-backgroundHover"
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
