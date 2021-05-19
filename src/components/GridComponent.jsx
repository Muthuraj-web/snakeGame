import "bootstrap/dist/css/bootstrap.css";

export default function GridComponent({ grid, cellSize, food }) {
  const isFood = (cell) => {
    return food[0] === cell.rowIndex && food[1] === cell.colIndex;
  };

  return (
    <div className="container m-0 p-0 m-auto">
      {grid.map((row) => (
        <div
          className="row m-0 p-0 m-auto"
          style={{
            width: `${grid.length * cellSize}px`,
            backgroundColor: "black"
          }}
        >
          {row.map((cell) => (
            <div
              className="col m-0 p-0"
              style={{
                minHeight: `${cellSize}px`,
                minWidth: `${cellSize}px`,
                maxHeight: `${cellSize}px`,
                maxWidth: `${cellSize}px`,
                border: cell.isSnake ? "0.2px double black" : "0px",
                backgroundColor: cell.isSnake
                  ? "white"
                  : isFood(cell)
                  ? "yellow"
                  : "black",
                borderRadius: isFood(cell) ? "50%" : "10%"
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
