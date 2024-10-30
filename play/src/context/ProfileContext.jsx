import { act, useEffect, useState } from "react";
import { createContext } from "react";

export const Context = createContext(null);

export const GamesContext = (props) => {
  const [game, setGame] = useState([]);
  const [size, setSize] = useState(8);
  const [result, setResult] = useState(null);
  const [actualGame, setActualGame] = useState({});
  const [multiGames, setMultiGames] = useState([]);

  const getGame = async (name) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&genres=${name}&page_size=${size}`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      setGame(res.results);
    } catch (error) {
      console.error("Failed to fetch banner:", error);
      // }
    }
  };

  const getGameId = (game) => {
    return game?.id;
  };

  const getActualGame = async (id) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const req = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${apiKey}`
      );

      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`);
      }
      const res = await req.json();
      setActualGame(res);
    } catch (error) {
      console.error("Failed to fetch Game:", error);
    }
  };
  const moveObj = (newGame) => {
    if (actualGame && actualGame.id) {
      setMultiGames((prev) => {
        const check = prev.some((game) => game.id === newGame.id);
        return check ? prev : [...prev, newGame];
      });
    }
  };

  useEffect(() => {
    if (result) {
      getActualGame(result);
    }
  }, [result]);

  useEffect(() => {
    moveObj(actualGame);
  }, [actualGame]);

  const contextValue = {
    game,
    setGame,
    getGame,
    getGameId,
    result,
    setResult,
    actualGame,
    setActualGame,
    getActualGame,
    multiGames,
    setMultiGames,
    moveObj,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
