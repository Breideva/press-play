import { useContext } from "react";
import { Context } from "../context/ProfileContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function Profile() {
  const { multiGames, gridCon, setGridCon, removeObj, removeAll } =
    useContext(Context);

  return (
    <div className="flex justify-center relative bg-background min-h-screen h-full text-text">
      <div className="w-full flex justify-center ">
        <div className="w-9/12 flex flex-col gap-y-2 gap:0 justify-start items-start">
          <div
            className={`flex flex-col gap-8 text-center lg:text-start justify-center items-center pt-24 mb-24 pb-20 w-full h-full`}
          >
            <div className="w-full">
              <h1
                className="w-fit text-6xl lg:text-7xl xl:text-8xl font-bold rounded-xl"
                style={{
                  background: "linear-gradient(to right, #F0F5FA, #D04D11 50%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Saved Games
              </h1>
            </div>
            {!multiGames.length ? (
              <div className="flex flex-col justify-center items-center w-full h-full gap-4 bg-backgroundLight rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <h1 className="text-7xl font-semibold">No Games</h1>
                  <p className="text-2xl">Need Suggestions?</p>
                </div>
                <Link
                  to="/main/Games"
                  className="relative text-2xl lg:text-3xl z-10 text-primary bg-backgorund p-2 rounded-lg border-2 border-primary transition-transform duration-500 hover:text-secondary hover:border-secondary hover:scale-105 active:scale-95"
                >
                  Games
                </Link>
              </div>
            ) : (
              <div>
                <div className="text-text grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-start items-start text-center w-full h-full min-h-72">
                  {multiGames.map((items, index) =>
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
                            <div className="flex justify-center gap-4 items-center pb-4">
                              <h2 className="text-xl">{items.name}</h2>
                            </div>
                          </Link>
                          <div className="flex flex-col items-center transition-all duration-300 top-full absolute w-full rounded-b-xl bg-backgroundHover">
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
                            <div>
                              <button
                                onClick={() => removeObj(index, index + 1)}
                                className="p-1 border-2 transition-all duration-500 border-red-600 rounded-xl mb-4 text-red-600 hover:text-red-400 hover:border-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={`/game/${items.id}`}
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
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
                <div className="flex justify-center items-center mt-20">
                  <button
                    onClick={() => removeAll(multiGames)}
                    className="p-2 border-2 transition-all duration-500 border-red-600 rounded-xl mb-4 text-red-600 hover:text-red-400 hover:border-red-500"
                  >
                    Remove All
                  </button>
                </div>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
