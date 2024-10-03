import BigBanner from "../components/HomePage/BigBanner";
import FirstBody from "../components/Sections/FirstBody";
import Header from "../components/HomePage/Header";
import SecondBody from "../components/Sections/SecondBody";
import GameGrid from "../components/HomePage/GameGrid";
import ThirdBody from "../components/Sections/ThirdBody";

export default function Home() {
  return (
    <>
      <Header />
      <FirstBody />
      <SecondBody />
      <ThirdBody />
      <GameGrid />
    </>
  );
}
