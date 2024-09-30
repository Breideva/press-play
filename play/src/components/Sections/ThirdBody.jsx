import BodyScroll from "../BodyScroll";

export default function ThirdBody() {
  return (
    <div className="flex justify-center relative bg-background text-text">
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 gap:0 justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full justify-center items-center">
            <BodyScroll />
            <BodyScroll genres="2" speed="1250" />
            <BodyScroll genres="15" speed="1500" />
          </div>
        </div>
      </div>
    </div>
  );
}
