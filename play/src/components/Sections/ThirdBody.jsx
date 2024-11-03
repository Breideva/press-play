import BodyScroll from "../HomePage/BodyScroll";

export default function ThirdBody() {
  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 gap:0 justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-center items-center">
            <BodyScroll genres="11" speed="750" />
            <BodyScroll genres="3" speed="1500" />
          </div>
        </div>
      </div>
    </div>
  );
}
