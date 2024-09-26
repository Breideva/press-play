import React from "react";
import BigBanner from "./BigBanner";
import BodyScroll from "./BodyScroll";

export default function FirstBody() {
  return (
    <div id="body">
    <div className="flex justify-center relative">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 lg:gap-0 justify-center items-center pt-14 mb-20 ">
          <BigBanner />
          <BodyScroll/>
        </div>
      </div>
    </div>
  </div>
  );
}
