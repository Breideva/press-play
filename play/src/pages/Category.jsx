import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";
import GameGrid from "../components/HomePage/GameGrid";

export default function Category() {
  const params = useParams();
  const [category, setCategory] = useState([]);
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

  const getCategory = async (name) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&tags=${name}&page_size=${size}`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      setCategory(res.results);
    } catch (error) {
      console.error("Failed to fetch category:", error);
    }
  };

  useEffect(() => {
    getCategory(params.type);
  }, [params.type]);
  useEffect(() => {
    console.log(params.type);
  }, [params]);

  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col text-center gap-8 pt-24 pb-12">
          <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold pt-12 pb-4">
            {params.type.charAt().toUpperCase() +
              params.type.slice(1) +
              " " +
              "Games"}
          </h1>
          <div className="text-text gap-4 justify-center items-center text-center w-full">
            <GameGrid tag={params.type} title="" />
            {/* {category.map((items) => (
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
            ))} */}
          </div>
          {/* <div>
            <button onClick={addSize} className="p-4 bg-backgroundLight rounded-xl shadow-xl transition-all duration-500 hover:scale-105 hover:bg-backgroundHover">
              {button}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
