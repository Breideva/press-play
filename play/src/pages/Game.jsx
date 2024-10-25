import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuBookmarkPlus } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import GameInfoArray from "../components/GameInfoArray";
import GameInfo from "../components/GameInfo";
import BodyScroll from "../components/HomePage/BodyScroll";

// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

export default function Game() {
  const params = useParams();
  const [game, setGame] = useState({});
  const [screenshot, setScreenshot] = useState([]);
  const [load, setLoad] = useState(false);
  const [displayImg, setDisplayImg] = useState(false);
  const [ssImg, setSsImg] = useState(null);

  const loadContent = () => {
    setLoad(!load);
  };

  const showImg = () => {
    setDisplayImg(!displayImg);
  };

  // useEffect(() => {
  //   gsap.to("#content", {
  //     duration: 5,
  //     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  //   });
  // }, [loadContent]);

  const getGame = async (name) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games/${name}?key=${apiKey}`
      );
      const ssReq = await fetch(
        `https://api.rawg.io/api/games/${name}/screenshots?key=${apiKey}`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      const ssRes = await ssReq.json();
      setScreenshot(ssRes.results);
      setGame(res);
    } catch (error) {
      console.error("Failed to fetch Game:", error);
    }
  };

  let checkSize = game?.description?.length < 500;
  let croppedText = game?.description?.slice(0, 500) + "...";

  useEffect(() => {
    getGame(params.display);
  }, [params.display]);
  // useEffect(() => {

  // }, [game]);

  return (
    <div className="flex justify-center relative bg-background text-text">
      <div
        className="w-full flex justify-center bg-gradient-to-b to-background bg-no-repeat bg-center bg-cover transition-all duration-700"
        // bg-no-repeat bg-center bg-cover
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent -100%, #070C0D 75%, var(--tw-gradient-to)), url(${game.background_image})`,
        }}
      >
        {displayImg ? (
          <div
            onClick={showImg}
            className="w-full h-full absolute bg-background bg-opacity-90 z-50 transition-all duration-300 cursor-pointer"
          >
            <img
              className="w-1/2 sticky left-1/4 top-1/4 border-2 border-text"
              src={ssImg}
              alt=""
            />
          </div>
        ) : (
          <div className="w-full h-full absolute bg-background bg-opacity-90 -z-10 opacity-0 ">
            <img
              className="w-1/2 sticky left-1/4 top-1/4 border-2 border-text"
              src={ssImg}
              alt=""
            />
          </div>
        )}

        <div className="w-9/12 flex flex-col text-center gap-8 pt-24 pb-12">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-around items-center pb-12">
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl w-1/2 md:w-1/4 font-normal">
                {game.released}
              </h4>
              <h1 className="text-4xl sm:text-5xl lg:6xl xl:text-8xl font-bold">
                {game.name}
              </h1>
              <div className="flex items-center justify-center gap-1 w-1/2 md:w-1/4 font-normal">
                <h4 className="text-xl sm:2xl md:4xl lg:5xl xl:text-6xl">
                  {game.rating}
                </h4>
                <FaStar className="text-yellow-500 text-xl sm:2xl md:4xl lg:5xl xl:text-6xl" />
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light">
                  ({game.reviews_count})
                </h4>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-x-12">
              <div className="flex flex-col gap-y-8 gap-x-4 lg:w-1/2 w-full items-center pb-8 lg:pb-0 text-sm sm:text-base lg:xl">
                {/* <h2 className="text-4xl pb-4 text-secondary font-semibold">
                  Description
                </h2> */}
                <div className="bg-background rounded-xl p-4 bg-opacity-65">
                  {load || checkSize ? (
                    <p id="content" className="">
                      <span
                        dangerouslySetInnerHTML={{ __html: game.description }}
                      />
                    </p>
                  ) : (
                    <p id="content-1" className="">
                      {game.description_raw ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: croppedText }}
                        />
                      ) : (
                        ""
                      )}
                    </p>
                  )}
                  {checkSize ? (
                    <></>
                  ) : (
                    <>
                      {load ? (
                        <button
                          onClick={loadContent}
                          className="p-2 mt-2 bg-primary w-fit rounded-xl z-20"
                        >
                          Hide Content
                        </button>
                      ) : (
                        <button
                          onClick={loadContent}
                          className="p-2 mt-2 bg-primary w-fit rounded-xl z-20"
                        >
                          Show More
                        </button>
                      )}
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                  {screenshot.map((items) => (
                    <div
                      onClick={() => showImg(setSsImg(items.image))}
                      key={items.id}
                    >
                      <img
                        className="h-full transition-all duration-300 hover:scale-105 cursor-pointer"
                        src={items.image}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="w-full lg:w-1/2 grid-cols-2 grid gap-y-8 gap-x-4"
                style={{
                  gridTemplateRows: "250px 150px 200px 100px 150px 225px",
                }}
              >
                {/* <GameInfoArray
                  title="Developers"
                  items={game.developers}
                  propertyName="name"
                  span="1"
                /> */}
                <GameInfo
                  title="Metacritic"
                  items={
                    game.metacritic !== undefined &&
                    game.metacritic !== null ? (
                      game.metacritic > 70 ? (
                        <h3
                          id="critic-btn"
                          className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-6xl text-green-600 font-semibold"
                        >
                          {game.metacritic}
                        </h3>
                      ) : game.metacritic >= 60 && game.metacritic <= 70 ? (
                        <h3
                          id="critic-btn"
                          className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-6xl text-yellow-600 font-semibold"
                        >
                          {game.metacritic}
                        </h3>
                      ) : (
                        <h3
                          id="critic-btn"
                          className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-6xl text-red-600 font-semibold"
                        >
                          {game.metacritic}
                        </h3>
                      )
                    ) : (
                      <h3
                        id="critic-btn"
                        className="text-md sm:text-lg md:text-xl lg:text-sm xl:text-4xl text-text font-semibold"
                      >
                        No Score
                      </h3>
                    )
                  }
                  span="1"
                  size="60"
                />
                <div className="bg-background p-8 bg-opacity-65 justify-center items-center grid-rows-2 flex flex-col rounded-xl border-2 border-primary">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl text-secondary pb-4 font-semibold">
                    Platforms
                  </h3>
                  <div className="flex gap-1 flex-wrap justify-center text-xs sm:text-lg md:text-xl lg:text-xs xl:text-base">
                    {game.platforms &&
                      game.platforms.length > 0 &&
                      game.platforms.map((items, index) => (
                        <div className="flex" key={index}>
                          <p className="font-normal">
                            {items.platform.name}
                            {index < game.platforms.length - 1 && ","}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <GameInfoArray
                  title="Publishers"
                  items={game.publishers}
                  propertyName="name"
                  span="1"
                />

                <GameInfoArray
                  title="Developers"
                  items={game.developers}
                  propertyName="name"
                  span="1"
                />
                <div
                  // style={{ gridRow: "4 / span 2" }}
                  className="bg-primary font-semibold h-full bg-opacity-95 col-span-2 justify-center flex items-center gap-2 transition-all duration-500 rounded-xl hover:scale-105 hover:bg-secondary"
                >
                  <button className="text-3xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl">
                    Add to Favroites
                  </button>
                  <LuBookmarkPlus className="text-3xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl" />
                </div>
                <GameInfo
                  title="Website"
                  items={<a href={game.website}>{game.website}</a>}
                  color="#3C5DF0"
                  span="1"
                  size="16"
                />
                <GameInfo
                  title="Achievements"
                  items={game.achievements_count}
                  span="1"
                  size="24"
                />
                <GameInfoArray
                  title="Genres"
                  items={game.genres}
                  propertyName="name"
                  span="1"
                />
                <GameInfo
                  title="Rating"
                  items={game?.esrb_rating?.name}
                  size="20"
                  padding="16"
                />
                <GameInfoArray
                  title="Tags"
                  items={game.tags}
                  propertyName="name"
                  span="2"
                />
              </div>
            </div>
            <div>
              {/* <GameInfoArray
                    title="Tags"
                    items={game.tags}
                    propertyName="name"
                    span="1"
                    height="300"
                  />
                  <GameInfoArray
                    title="Tags"
                    items={game.tags}
                    propertyName="name"
                    span="1"
                    height="300"
                  /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
