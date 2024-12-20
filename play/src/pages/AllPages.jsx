import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GameDisplay from "./GameDisplay";
import Category from "./Category";
import Game from "./Game";
import Searched from "./Searched";
import Profile from "./Profile";
import { StartAtTop } from "../context/ProfileContext";

export default function AllPages() {
  return (
    <>
      <StartAtTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main/:content" element={<GameDisplay />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/game/:display" element={<Game />} />
        <Route path="/search/:menu" element={<Searched />} />
        <Route path="/profile/:select" element={<Profile />} />
      </Routes>
    </>
  );
}
