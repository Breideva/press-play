import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { Context } from "../context/ProfileContext";
import svgTop from "../assets/steps-b.svg";

export default function Searched() {
  const { isActive, changeActive, setResult, getGameId, gridCon, setGridCon } =
    useContext(Context);

  const params = useParams();
  const [searched, setSearched] = useState([]);
  const [button, setButton] = useState("Show More");
  const [size, setSize] = useState(8);

  const addSize = () => {
    if (size < 40) {
      setSize((prevSize) => prevSize + 8);
    } else {
      setButton("All Loaded");
      return;
    }
  };

  const getsearched = async (name) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=${size}&metacritic=40,100`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      setSearched(res.results);
    } catch (error) {
      console.error("Failed to fetch searched:", error);
    }
  };

  useEffect(() => {
    getsearched(params.menu);
  }, [params.menu]);
  useEffect(() => {
    getsearched(params.menu);
  }, [size]);

  return (
    <div className="flex flex-col items-center justify-center relative bg-background min-h-screen text-text">
      <div
        className="w-full bg-backgroundHover flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${svgTop})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", }}
      >
        <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold mt-12 py-8">
          {params.menu.charAt().toUpperCase() + params.menu.slice(1)}
        </h1>
      </div>
      <div className="w-full flex flex-col text-center gap-8  pb-12 px-12">
        <div className="text-text grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center text-center w-full">
          {searched.map((items) => (
            <div key={items.id}>
              <div className="bg-backgroundLight  shadow-xl rounded-xl transition-all duration-500 hover:bg-backgroundHover hover:scale-105">
                <Link to={`/game/${items.id}`}>
                  <img
                    className="p-4 rounded-xl"
                    src={items.background_image}
                    alt=""
                  />
                </Link>
                <div className="flex flex-col justify-center gap-4 items-center pb-4">
                  <div className="flex flex-wrap justify-center items-center gap-x-2">
                    <Link to={`/game/${items.id}`} className="text-xl w-fit">
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
                  <div className="flex gap-4 items-center">
                    {items.metacritic !== undefined &&
                    items.metacritic !== null ? (
                      items.metacritic > 70 ? (
                        <h3
                          id="critic-btn"
                          className="text-2xl sm:text-lg md:text-xl lg:text-xl xl:text-2xl border-4 p-2 rounded-xl border-green-600 text-green-600 font-semibold"
                        >
                          {items.metacritic}
                        </h3>
                      ) : items.metacritic >= 60 && items.metacritic <= 70 ? (
                        <h3
                          id="critic-btn"
                          className="text-2xl sm:text-lg md:text-xl lg:text-xl xl:text-2xl border-4 p-2 rounded-xl border-yellow-600 text-yellow-600 font-semibold"
                        >
                          {items.metacritic}
                        </h3>
                      ) : (
                        <h3
                          id="critic-btn"
                          className="text-2xl sm:text-lg md:text-xl lg:text-xl xl:text-2xl border-4 p-2 rounded-xl border-red-600 text-red-600 font-semibold"
                        >
                          {items.metacritic}
                        </h3>
                      )
                    ) : (
                      <h3
                        id="critic-btn"
                        className="text-2xl sm:text-lg md:text-xl lg:text-xl xl:text-2xl border-4 p-2 rounded-xl border-text text-text font-bold"
                      >
                        No Score
                      </h3>
                    )}
                  </div>
                  {/* <div className="flex gap-1 flex-wrap justify-center">
                      {items.platforms.map((item, index) => (
                        <div key={item.platform.id}>
                          <p>
                            {item.platform.name}
                            {index < items.platforms.length - 1 && (
                              <span>,</span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={addSize}
            className="p-4 bg-backgroundLight rounded-xl shadow-xl transition-all duration-500 hover:scale-105 hover:bg-backgroundHover"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
