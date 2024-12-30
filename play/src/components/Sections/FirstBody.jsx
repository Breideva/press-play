import BigBanner from "../HomePage/BigBanner";
import svgTop from "../../assets/steps-t.svg";
import svgBottom from "../../assets/steps-b.svg";

export default function FirstBody() {
  return (
    <div className="flex flex-col justify-center relative bg-backgroundLight text-text gap-2">
      <div
        className="w-full h-24 md:h-40 lg:h-60 flex flex-col items-center justify-center text-center mb-8 md:mb-0"
        style={{
          backgroundImage: `url(${svgTop})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          aspectRatio: "4"
        }}
      >
        <div className="w-9/12 flex flex-col gap-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
            Enjoy playing timeless games
          </h2>
          <p className="text-sm lg:text-lg font-light">
            Play games that have stood the test of time and continue to
            captivate players
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 lg:gap-8 justify-center items-center ">
          <BigBanner name="22509" />
          <BigBanner name="23598" />
        </div>
      </div>
      <div
        className="w-full h-24 md:h-40"
        style={{
          backgroundImage: `url(${svgBottom})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
