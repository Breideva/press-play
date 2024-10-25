import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";

export default function Searched() {
  const params = useParams();
  const [searched, setSearched] = useState([]);
  const [size, setSize] = useState(12);
  const [button, setButton] = useState("Show More");

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
    <div className="flex justify-center relative bg-background h-full text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col text-center gap-8 pt-24 pb-12">
          {/* <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold pt-12 pb-4">{params.menu.charAt().toUpperCase() + params.menu.slice(1) + " " + "Games"}</h1> */}
          <div className="text-text grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center text-center w-full">
            {searched.map((items) => (
              <Link to={`/game/${items.id}`} key={items.id}>
                <div className="bg-backgroundLight  shadow-xl rounded-xl transition-all duration-500 hover:bg-backgroundHover hover:scale-105">
                  <img
                    className="p-4 rounded-xl"
                    src={items.background_image}
                    alt=""
                  />
                  <div className="flex flex-col justify-center gap-4 items-center pb-4">
                    <div className="flex flex-wrap justify-center items-center gap-x-2">
                      <h2 className="text-xl">{items.name}</h2>
                      <LuBookmarkPlus className="text-3xl sm:text-2xl md:text-3xl text-primary transition-all duration-500 hover:text-secondary" />
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
              </Link>
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
    </div>
  );
}
