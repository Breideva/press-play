export default function GameInfoArray({ title, items, propertyName, span, padding }) {
  return (
    <div
      className="bg-background bg-opacity-65 justify-center flex flex-col rounded-xl border-2 border-primary overflow-hidden"
      style={{ gridColumn: `span ${span}`, padding: `${padding}px`}}
    >
      <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl pb-4 text-secondary font-semibold">{title}</h3>
      <div className="flex gap-1 flex-wrap justify-center lg:pb-0 text-sm sm:text-base  lg:xl">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div className="flex" key={index}>
              <p className="text-sm sm:text-base font-normal">
                {item[propertyName]}
                {index < items.length - 1 && <span>,</span>}
              </p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
