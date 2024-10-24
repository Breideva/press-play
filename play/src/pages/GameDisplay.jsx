import GameDisplayTags from "../components/GameDisplayTags";
import BodyScroll from "../components/HomePage/BodyScroll";
import { GiArrowCursor } from "react-icons/gi";
import GameGrid from "../components/HomePage/GameGrid";

export default function GameDisplay() {
  return (
    <div className="flex justify-center relative text-text bg-background">
      <div
        className="w-full flex justify-center"
        style={{
          background: "linear-gradient(to bottom, #D04D11 0%,#070C0D 10%)",
        }}
      >
        <div className="w-9/12 flex flex-col gap-8 pt-24 pb-12">
          <div className="flex justify-center items-end gap-4">
            <h1 className="font-bold text-6xl lg:text-7xl xl:text-8xl text-center">
              Games To Play
            </h1>
            {/* <GiArrowCursor className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" /> */}
          </div>
          <GameDisplayTags />
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <BodyScroll mousewheel="false" speed="1500" genres="3" />
            <BodyScroll mousewheel="false" genres="5" />
          </div>
          <GameDisplayTags effect="none" tag="survival" />
          <GameDisplayTags effect="none" tag="action-adventure" />
          <GameGrid tag="difficult"/>
          {/* <GameDisplayTags effect="none" tag="split-screen" /> */}
        </div>
      </div>
    </div>
  );
}
