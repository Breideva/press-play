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

  const closedOptions = [
    { title: "Profile", to: "/profile/select" },
    { title: "Home", to: "/" },
    { title: "Games", to: "/main/games" },
    { title: "About", to: "/about" },
  ];
  const openOption = closedOptions.slice(1);

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        className="w-full fixed flex justify-center z-50 bg-background"
        // style={{
        //   backgroundImage: "linear-gradient(to top, transparent, #070C0D)",
        // }}
      >
        <div className="w-9/12 justify-between md:justify-between flex items-center">
          {linesOpen ? (
            <div className="flex justify-between w-full">
              <button onClick={toggleMobile}>
                <TfiMenu className="text-primary text-4xl" />
              </button>
              {mobileOpen && (
                <ul
                  onMouseLeave={toggleMobile}
                  className="bg-background text-text border-2 border-text w-3/12 flex flex-col absolute top-10 justify-center text-center items-center transition-all duration-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl mt-2 rounded-xl z-40"
                >
                  {closedOptions.map((item) => (
                    <Link
                      to={item.to}
                      className="p-2 w-full rounded-lg transition-all duration-300 hover:bg-backgroundHover"
                    >
                      {item.title}
                    </Link>
                  ))}
                </ul>
              )}
              <SearchBar />
            </div>
          ) : (
            <div className="relative w-full flex items-center">
              <button
                onClick={openToggle}
                className="text-primary font-black text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-martel py-3 transition-all duration-300 hover:text-secondary"
              >
                PressPlay
              </button>

              {open && (
                <div className="absolute w-28 xl:w-40 top-12">
                  <ul
                    onMouseLeave={openToggle}
                    className="bg-background text-text border-2 flex flex-col justify-center text-center items-center transition-all duration-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl w-full rounded-2xl z-40"
                  >
                    {openOption.map((item) => (
                      <Link
                        to={item.to}
                        className="p-2 w-full rounded-xl transition-all duration-300 hover:bg-backgroundHover"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
              <SearchBar />
              <Link
                to="/profile/select"
                className="text-background bg-primary p-2 rounded-full transition-all duration-500 hover:bg-secondary"
              >
                <IoMdPerson className="text-2xl lg:text-3xl xl:text-4xl" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
