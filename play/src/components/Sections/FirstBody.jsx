
import BigBanner from "../BigBanner";

export default function FirstBody() {
  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 lg:gap-10 justify-center items-center pt-14 mb-20 overflow-hidden">
          <BigBanner />    
          <BigBanner genres="3" />    
        </div>
      </div>
    </div>
  );
}
