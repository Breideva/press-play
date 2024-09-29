import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar() {
  return (
    <div className="w-9/12 flex justify-center items-center">
      <form
        className="w-full md:w-3/4 group border-4 border-primary rounded-3xl flex items-center transition-all duration-500 bg-opacity-0 bg-text focus-within:bg-opacity-100 focus-within:border-text hover:border-text"
        action=""
      >
        <HiMagnifyingGlass className="w-10 h-10 py-2 pl-2 text-2xl rounded-l-3xl text-text group-focus-within:text-background" />
        <input
          className="pl-2 w-full h-full text-text outline-none text-xl rounded-xl transition-all bg-transparent duration-500 bg-opacity-0 group-bg-text group-focus-within:bg-opacity-100 group-focus-within:text-background"
          type="text"
        />
      </form>
    </div>
  );
}
