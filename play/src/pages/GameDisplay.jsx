import GameDisplayTags from "../components/GameDisplayTags";
import GameGrid from "../components/HomePage/GameGrid";
import person from "../assets/games-person.png";
import svgTop from "../assets/wave-t.svg";
import svgBottom from "../assets/wave-b.svg";
import { LuSwords } from "react-icons/lu";
import { BsLightningCharge, BsPencilSquare } from "react-icons/bs";
import { GrChatOption } from "react-icons/gr";

export default function GameDisplay() {
  return (
    <div className="flex flex-col items-center justify-center relative text-text min-h-screen h-full bg-background">
      <div className="w-9/12 h-full flex flex-col justify-start items-center">
        <div className="w-full h-1/2 bg-backgroundLight mt-20 rounded-md p-8 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col justify- gap-8 h-full w-2/3 text-center items-center">
            <div className="flex flex-col gap-4 items-center">
              <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                Find games to play and create unforgettable experiences!
              </h2>
              <p className="font-light text-lg xl:text-xl w-full lg:w-2/3">
                Dive into a world of endless possibilities with games that
                entertain, challenge, and inspire. Whether you're looking for
                thrilling adventures, immersive storytelling, or casual fun,
                there's a game waiting for you. Discover new favorites, connect
                with unforgettable experiences, and make every play session a
                journey worth remembering.
              </p>
            </div>
            <div>
              <a
                href="#games"
                className="text-sm xl:text-4xl font-bold border-2 border-primary p-2 px-4 rounded-md hover:scale-105"
              >
                BROWSE GAMES
              </a>
            </div>
          </div>

          <div className="xl:w-1/3">
            <img className="h-fit" src={person} alt="" />
          </div>
        </div>
        <div className="w-full grid grid-cols-1">
          <GameDisplayTags effect="none" tag="survival" />
        </div>
      </div>
      <div
        className="w-full h-60"
        style={{
          backgroundImage: `url(${svgTop})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="w-full bg-backgroundLight flex flex-col items-center">
        <div className="w-9/12 flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center pb-8 mb-12 border-b w-full">
            <LuSwords className="text-9xl" />
            <h2 className="text-6xl font-bold">
              Unleash adventure with every game
            </h2>
          </div>

          <div id="games" className="flex flex-col">
            <div class="w-full grid grid-cols-1">
              <GameGrid title="" tag="singleplayer" />

              {/* <div className="grid grid-cols-1 lg:grid-cols-2 items-center text-center gap-2 w-full">
                <div className="col-span-1">
                  <BodyScroll genres="3" />
                </div>
                <div className="w-full col-span-1 flex flex-col items-center gap-2">
                  <h2 className="xl:text-5xl font-semibold">
                    Save Some Games for Later
                  </h2>
                  <div className="w-3/4 flex flex-col gap-12">
                    <p className="xl:text-2xl h-full font-light">
                      {" "}
                      Never forget a great game! By saving games to your profile
                      by bookmarking them, you can easily keep track of the ones
                      you want to try. Whether it’s an epic adventure, a fun
                      party game, or a relaxing puzzle, having them saved means
                      they’re always just a click away when you’re ready to
                      play.
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div
          className="w-full h-60"
          style={{
            backgroundImage: `url(${svgBottom})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="w-full flex justify-center bg-background pb-12">
          <div className="w-9/12">
            <div className="w-full flex flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-6xl font-bold">
                Why should you play video games?
              </h2>
              <p className="w-2/3 text-base font-normal">
                Video games offer an engaging way to relax, challenge your mind,
                and explore new worlds. They can enhance creativity, improve
                focus, and provide a fun way to connect with others.
              </p>
            </div>
            <div className="flex flex-col xl:flex-row w-full pt-12 text-center justify-between gap-8">
              <div className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-backgroundLight p-4 hover:scale-105 transition-all duration-200">
                <BsLightningCharge className="text-8xl text-primary" />
                <div className="w-5/6 flex flex-col gap-2">
                  <h3 className="text-4xl font-semibold">
                    Recharge with Video Games
                  </h3>
                  <p className="text-lg font-light">
                    Video games offer a fun escape, allowing you to relax and
                    recharge. They provide a break from daily stress while
                    immersing you in exciting adventures.
                  </p>
                </div>
              </div>
              <div className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-backgroundLight p-4 hover:scale-105 transition-all duration-200">
                <BsPencilSquare className="text-8xl text-primary" />
                <div className="w-5/6 flex flex-col gap-2">
                  <h3 className="text-4xl font-semibold">
                    Enhance your Creativity
                  </h3>
                  <p className="text-lg font-light">
                    Engaging in certain types of games, can stimulate your
                    imagination and encourage new ways of thinking. This can
                    help you solve problems more effectively, and think outside
                    the box.
                  </p>
                </div>
              </div>
              <div className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-backgroundLight p-4 hover:scale-105 transition-all duration-200">
                <GrChatOption className="text-8xl text-primary" />
                <div className="w-5/6 flex flex-col gap-2">
                  <h3 className="text-4xl font-semibold">
                    Help Connect with Others
                  </h3>
                  <p className="text-lg font-light">
                    Video games connect you with others, fostering teamwork and
                    friendship. They provide a fun way to interact and share
                    experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
