import { useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";

export const Context = createContext(null);

export const StartAtTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const GamesContext = (props) => {
  const [game, setGame] = useState([]);
  const [size, setSize] = useState(8);
  const [result, setResult] = useState(null);
  const [actualGame, setActualGame] = useState({});
  const [gridCon, setGridCon] = useState(null);
  const [isActive, setIsActive] = useState(() => {
    const saved = localStorage.getItem("checks");
    return saved ? JSON.parse(saved) : [];
  });
  const [multiGames, setMultiGames] = useState(() => {
    const saved = localStorage.getItem("games");
    return saved ? JSON.parse(saved) : [];
  });

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
  const removeObj = (index) => {
    setMultiGames((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
    setIsActive((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };
  const removeAll = () => {
    setMultiGames((prev) => []);
    setIsActive((prev) => []);
  };
  const changeActive = (items) => {
    setIsActive((prev) => {
      if (!prev.includes(items.id)) {
        return [...prev, items.id];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (result) {
      getActualGame(result);
    }
  }, [result]);

  useEffect(() => {
    moveObj(actualGame);
  }, [actualGame]);

  useEffect(() => {
    localStorage.setItem("checks", JSON.stringify(isActive));
    localStorage.setItem("games", JSON.stringify(multiGames));
  }, [multiGames]);

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
    removeAll,
    removeObj,
    gridCon,
    setGridCon,
    size,
    setSize,
    isActive,
    setIsActive,
    changeActive
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
