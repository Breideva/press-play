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
    <div className="flex justify-center relative min-h-screen bg-background text-text">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full bg-backgroundHover flex flex-col items-center justify-center">
          <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold mt-12 py-8">
            {params.type.charAt().toUpperCase() +
              params.type.slice(1) +
              " " +
              "Games"}
          </h1>
          <div className="h-12 bg-backgroundLight w-full"></div>
        </div>
        <div className="flex flex-col text-center gap-8 pb-12">
          <div className="text-text gap-4 flex justify-center items-start text-center w-full h-full ">
            <GameGrid tag={params.type} title="" />
          </div>
        </div>
      </div>
    </div>
  );
}
