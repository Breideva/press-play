import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { LuBookmarkPlus } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Context } from "../../context/ProfileContext";
import { FaCheck } from "react-icons/fa6";
import Home from "../../pages/Home";

export default function GameGrid({
  padding,
  tag,
  title = tag.charAt(0).toUpperCase() + tag.slice(1) + " " + "Games",
}) {
  const location = useLocation();
  const { isActive, changeActive, setResult, getGameId, gridCon, setGridCon } =
    useContext(Context);
  const [grid, setGrid] = useState([]);
  const [button, setButton] = useState("Show More");
  const [size, setSize] = useState(8);
  useEffect(() => {
    setSize(8);
    console.log("location chaged" + size);
    setButton("Load More");
  }, [location]);

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
    <div className="flex justify-center relative text-text bg-transparent">
      <div className="w-full flex justify-center">
        <div
          className={`w-full flex flex-col gap-8 text-center lg:text-start justify-center items-center pt-${padding} mb-20`}
        >
          <div className="w-full">
            <Link
              to={`/category/${tag}`}
              className="flex w-fit justify-start items-center
            text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold transition-all duration-500 hover:text-textLight"
            >
              {title}
              {/* <FiChevronsRight className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl" /> */}
            </Link>
          </div>

          <div className="text-text grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center text-center w-full">
            {grid.map((items) =>
              gridCon === items.id ? (
                <div
                  key={items.id}
                  onMouseLeave={() => setGridCon(null)}
                  className="transition-all duration-500"
                >
                  <div className="bg-backgroundLight relative shadow-xl rounded-t-xl transition-all duration-100 hover:bg-backgroundHover hover:scale-105">
                    <Link to={`/game/${items.id}`}>
                      <img
                        className="p-4 rounded-xl"
                        src={items.background_image}
                        loading="lazy"
                        alt=""
                      />
                    </Link>
                    <div className="flex-col flex sm:flex-row justify-center gap-4 items-center pb-4">
                      <Link to={`/game/${items.id}`} className="text-xl">
                        {items.name}
                      </Link>
                      {isActive.includes(items.id) ||
                      (localStorage.getItem("checks") &&
                        localStorage.getItem("checks").includes(items.id)) ? (
                        <div>
                          <FaCheck
                            className="text-2xl sm:text-3xl md:text-4xl
                 text-primary transition-all cursor-pointer duration-500 hover:text-secondary"
                          />
                        </div>
                      ) : (
                        <div>
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
                </div>
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
                      {isActive.includes(items.id) ||
                      (localStorage.getItem("checks") &&
                        localStorage.getItem("checks").includes(items.id)) ? (
                        <div>
                          <FaCheck
                            className="text-2xl sm:text-3xl md:text-4xl
                 text-primary transition-all cursor-pointer duration-500 hover:text-secondary"
                          />
                        </div>
                      ) : (
                        <div>
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
