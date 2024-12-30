import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameGrid from "../components/HomePage/GameGrid";
import svgTop from "../assets/steps-b.svg";

export default function Category() {
  const params = useParams();
  const [size, setSize] = useState(8);

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
    <div className="w-full flex flex-col justify-center relative min-h-screen bg-background text-text">
      <div
        className="w-full bg-backgroundHover flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${svgTop})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold mt-12 py-8">
          {params.type.charAt().toUpperCase() +
            params.type.slice(1) +
            " " +
            "Games"}
        </h1>
      </div>
      <div className="flex flex-col text-center gap-8 pb-12 px-12">
        <div className="text-text gap-4 flex justify-center items-start text-center w-full h-full ">
          <GameGrid tag={params.type} title="" padding="20" />
        </div>
      </div>
    </div>
  );
}
