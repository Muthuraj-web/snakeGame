import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import gridNode from "./GridNode";
import GridComponent from "./GridComponent";

export default class HomeComponent extends Component {
  constructor(){
    super()
    this.direction = [0,1]
    this.enableVerticalMovement = true
  }
  
  state = {
    grid: [],
    gridSize: Math.floor(
      Math.min(window.innerHeight - 50, window.innerWidth - 50) / 15
    ),
    cellSize: 15
  };

  componentDidMount() {
    this.initializeGrid();
  }

  initializeGrid = () => {
    let grid = [];
    for (let row = 0; row < this.state.gridSize; row++) {
      let rowArr = [];
      for (let col = 0; col < this.state.gridSize; col++) {
        rowArr.push(new gridNode(row, col));
      }
      grid.push(rowArr);
    }
    grid[0][0].isSnake = true;
    
    this.direction = [0,1]
    
    this.setState({
      grid: [...grid],
      food: [...this.newGridFood(0, 0, grid)],
      end: false,
      snakeBody: [[0, 0]]
    });
  };

  newGridFood = (row, col, grid) => {
    while (row < 0 || col < 0 || grid[row][col].isSnake) {
      row = Math.ceil(Math.random() * this.state.gridSize - 1);
      col = Math.ceil(Math.random() * this.state.gridSize - 1);
    }
    return [row, col];
  };

  moveSnake = () => {
    let { grid, snakeBody, food } = this.state;
    let newGrid = [...grid];
    let direction = this.direction;
    let setNewFood = false;

    let head = snakeBody[snakeBody.length - 1];

    let rowIndex = direction[0] + head[0];
    let colIndex = direction[1] + head[1];

    if (
      rowIndex < 0 ||
      rowIndex >= newGrid.length ||
      colIndex < 0 ||
      colIndex >= newGrid.length
    )
      return this.setState({ end: true });

    let nextCell = newGrid[rowIndex][colIndex];

    if (nextCell.isSnake) return this.setState({ end: true });

    if (nextCell.rowIndex !== food[0] || nextCell.colIndex !== food[1]) {
      newGrid[snakeBody[0][0]][snakeBody[0][1]].isSnake = false;
      snakeBody = snakeBody.slice(1, snakeBody.length);
    } else {
      setNewFood = true;
    }

    nextCell.isSnake = true;

    snakeBody.push([nextCell.rowIndex, nextCell.colIndex]);

    if (setNewFood) {
      return this.setState({
        grid: [...newGrid],
        snakeBody: [...snakeBody],
        food: this.newGridFood(food[0], food[1], newGrid)
      });
    }
    this.setState({
      grid: [...newGrid],
      snakeBody: [...snakeBody]
    });
  };

  setDirection = (rowInc, colInc) => {
    this.direction = [rowInc, colInc];
    this.enableVerticalMovement = !this.enableVerticalMovement;
  };

  render() {
    if (!this.state.grid.length) return <></>;
    if (!this.state.end) {
      let timer = setTimeout(() => {
        this.moveSnake(timer);
      }, 100);
    }
    return (
      <React.Fragment>
        <div
          className="container p-0"
          style={{
            width: `${this.state.grid.length * this.state.cellSize}px`
          }}
        >
          <h1 className="m-0 p-0">The Snake</h1>
          <p className="m-0 p-0"> Score - {this.state.snakeBody.length - 1}</p>
          <button
            disabled={!this.state.end}
            className="btn rounded-0 btn-danger pl-2 pr-2 pt-0 pb-0 "
            onClick={this.initializeGrid}
          >
            RESET
          </button>
        </div>
        <br />
        <GridComponent
          food={this.state.food}
          cellSize={this.state.cellSize}
          grid={this.state.grid}
        />
        <div
          className="m-auto"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: `${this.state.grid.length * this.state.cellSize}px`
          }}
        >
          <button
            style={{
              backgroundColor: "black"
            }}
            className="rounded-0 text-light border p-3"
            disabled={!this.enableVerticalMovement}
            onClick={() => {
              this.setDirection(-1, 0);
            }}
          >
            {" "}
            ↑{" "}
          </button>
        </div>
        <div
          className="m-auto"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: `${this.state.grid.length * this.state.cellSize}px`
          }}
        >
          <button
            style={{
              backgroundColor: "black"
            }}
            className="rounded-0 text-light border p-3"
            disabled={this.enableVerticalMovement}
            onClick={() => {
              this.setDirection(0, -1);
            }}
          >
            {" "}
            ←{" "}
          </button>
          <button
            style={{
              backgroundColor: "black"
            }}
            className="rounded-0 text-light border p-3"
            disabled={!this.enableVerticalMovement}
            onClick={() => {
              this.setDirection(1, 0);
            }}
          >
            {" "}
            ↓{" "}
          </button>
          <button
            style={{
              backgroundColor: "black"
            }}
            className="rounded-0 text-light border p-3"
            disabled={this.enableVerticalMovement}
            onClick={() => {
              this.setDirection(0, 1);
            }}
          >
            {" "}
            →{" "}
          </button>
        </div>
      </React.Fragment>
    );
  }
}
