import Person from "../../assets/body-3-person.png";
import Circles from "../../assets/body-2-circles.png";

export default function SecondBody() {
  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col gap-0 sm:gap-8 sm:flex-row text-center lg:text-start justify-center items-center pt-14 mb-20">
          <div className="w-full sm:w-1/2 flex flex-col gap-y-2 lg:gap-y-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-8xl relative z-20 font-bold">
              Find a game that matches your playstyle.
            </h2>
            <p className="text-lg sm:text-xl md:2xl lg:3xl font-semibold">
              Looking for the perfect game that suits your preferences? Explore
              a wide range of games specifically designed to align with your
              individual playstyle.
            </p>
            <button className="z-30 my-2 text-2xl lg:text-3xl p-3 border-4 border-primary text-primary shadow-xl rounded-lg transition-transform duration-700 hover:border-secondary hover:text-secondary hover:scale-105 active:scale-95">
              Explore Games
            </button>
          </div>
          <div className="relative w-1/2 sm:w-1/2">
            <img className="absolute z-20" src={Person} alt="" />
            <img className="relative z-10 " src={Circles} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
