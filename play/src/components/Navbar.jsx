import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [linesOpen, setLinesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const checkSize = () => {
    let screenWidth = window.innerWidth;
    setLinesOpen(screenWidth <= 765);
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const openToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full fixed flex justify-center z-50 bg-gradient-to-b from-background">
        <div className="w-9/12 justify-between md:justify-between flex items-center">
          {linesOpen ? (
            <div className="flex justify-between w-full">
              <button onClick={toggleMobile}>
                  <TfiMenu className="text-primary text-4xl" />
              </button>
              {mobileOpen && (
                <ul onMouseLeave={toggleMobile} className="bg-primary w-3/12 flex flex-col absolute top-10 justify-center text-center items-center transition-all duration-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2 rounded-xl z-40">
                  <Link
                    to="/"
                    className="border-b-2 p-2 border-background rounded-t-xl w-full transition-all duration-300 hover:bg-secondary"
                  >
                    Home
                  </Link>
                  <Link
                    to="/"
                    className="border-b-2 p-2 border-background rounded-t-xl w-full transition-all duration-300 hover:bg-secondary"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/games"
                    className="border-b-2 p-2 border-background w-full transition-all duration-300 hover:bg-secondary"
                  >
                    Games
                  </Link>
                  <Link
                    to="/consoles"
                    className="border-b-2 p-2 border-background w-full transition-all duration-300 hover:bg-secondary"
                  >
                    Consoles
                  </Link>
                  <Link
                    to="/about"
                    className="p-2 w-full rounded-b-xl transition-all duration-300 hover:bg-secondary"
                  >
                    About
                  </Link>
                </ul>
              )}

              <SearchBar />
            </div>
          ) : (
            <div className="relative w-full flex items-center">
              <button
                onClick={openToggle}
                className="bg-primary text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold font-martel p-3 rounded-b-xl hover:bg-secondary"
              >
                PressPlay
              </button>

              {open && (
                <div className="absolute w-2/12 top-16">
                  <ul onMouseLeave={openToggle} className="bg-primary flex flex-col justify-center text-center items-center transition-all duration-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full rounded-xl z-40">
                    <Link
                      to="/"
                      className="border-b-2 p-2 border-background rounded-t-xl w-full transition-all duration-300 hover:bg-secondary"
                    >
                      Home
                    </Link>
                    <Link
                      to="/games"
                      className="border-b-2 p-2 border-background w-full transition-all duration-300 hover:bg-secondary"
                    >
                      Games
                    </Link>
                    <Link
                      to="/consoles"
                      className="border-b-2 p-2 border-background w-full transition-all duration-300 hover:bg-secondary"
                    >
                      Consoles
                    </Link>
                    <Link
                      to="/about"
                      className="p-2 w-full rounded-b-xl transition-all duration-300 hover:bg-secondary"
                    >
                      About
                    </Link>
                  </ul>
                </div>
              )}

              <SearchBar />

              <button className="text-background bg-primary p-2 rounded-full transition-all duration-500 hover:bg-secondary">
                <IoMdPerson className="text-2xl lg:text-3xl xl:text-4xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
