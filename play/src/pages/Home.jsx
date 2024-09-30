import BigBanner from "../components/BigBanner";
import FirstBody from "../components/Sections/FirstBody";
import Header from "../components/Header";
import SecondBody from "../components/Sections/SecondBody";
import GameGrid from "../components/GameGrid";
import ThirdBody from "../components/Sections/ThirdBody";

export default function Home() {
  return (
    <>
      <Header />
      <FirstBody />
 
      <SecondBody />
      <ThirdBody/>
      <GameGrid />
    </>
  );
}
