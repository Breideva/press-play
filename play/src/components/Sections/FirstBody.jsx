import BigBanner from "../HomePage/BigBanner";



export default function FirstBody() {
  return (
    <div className="flex justify-center relative bg-background text-text"
    >
      <div className="w-full flex justify-center">
        <div className="w-9/12 flex flex-col lg:flex-row gap-y-10 lg:gap-8 justify-center items-center pt-14 mb-20 overflow-hidden">
          <BigBanner name="22509" />
          <BigBanner name="23598"/>
        </div>
      </div>
    </div>
  );
}
