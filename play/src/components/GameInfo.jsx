export default function GameInfo({ title, items, span, size, color, padding }) {
  return (
    <div
      className="bg-background bg-opacity-65 justify-center flex flex-col rounded-xl border-2 border-primary"
      style={{ gridColumn: `span ${span}`, padding: `${padding}px` }}
    >
      <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-xl xl:text-3xl pb-4 text-secondary font-semibold">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center">
        {items ? (
          <div
            className="flex"
            style={{ fontSize: `${size}px`, color: `${color}` }}
          >
            <p className="text-sm sm:text-base font-normal">{items}</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
