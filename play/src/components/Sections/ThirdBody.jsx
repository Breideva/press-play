import BodyScroll from "../HomePage/BodyScroll";
import GameGrid from "../HomePage/GameGrid";
import svgTop from "../../assets/steps-t2.svg";
import svgBottom from "../../assets/steps-b2.svg";

export default function ThirdBody() {
  return (
    <div className="flex justify-center relative bg-backgroundLight text-text">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div
          className="w-full h-24 md:h-40 "
          style={{ backgroundImage: `url(${svgTop})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", }}
        ></div>
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 gap:0 justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-8 justify-center items-start pt-8 pb-4">
            <BodyScroll genres="3" speed="750" />
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                The Evolution of Gaming Beyond the Screen{" "}
              </h2>
              <h4 className="text-sm sm:text-lg lg:text-xl font-light">
                Video games have transformed into more than just
                point-and-click. They have evolved into immersive journeys that
                showcase some of the best storytelling in entertainment. From
                expansive open-world adventures to high-energy competitive
                experiences, gaming offers a diverse array of encounters that
                cater to every type of player.
              </h4>
              <p className="text-primary font-bold text-xs sm:text-sm md:text-base">
                Gaming can be more than a pastime when it's an adventure into
                limitless possibilities.
              </p>
            </div>
          </div>
        </div>
        <div
          className="w-full h-24 md:h-40"
          style={{ backgroundImage: `url(${svgBottom})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", }}
        ></div>
        <div className="w-full bg-background flex items-center justify-center">
          <div className="w-full px-12">
            <GameGrid title="Singleplayer" tag="singleplayer" padding="20" bg="backgroundLight" />
          </div>
        </div>
      </div>
    </div>
  );
}
