import React from "react";
import { colors } from "./common";
import { GameRow } from "./GameRow";
import { ColorSelection } from "./ColorSelection";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 12,
      numberOfColors: 6,
      decodingBoard: [1, 2, 3, 5],
      actualSelectedColor: 1,
    };

    this.setColor = this.setColor.bind(this);
  }

  render() {
    let rowsArray = this.generateRowsArray();
    return (
      <div id={"game"}>
        <ColorSelection setColor={this.setColor} />
        <div>{rowsArray}</div>
      </div>
    );
  }

  generateRowsArray() {
    let rowsArray = [];
    for (let i = 0; i < this.state.numberOfRows; i++) {
      rowsArray.push(
        <GameRow
          selectedColor={this.state.actualSelectedColor}
          gameSolution={this.state.decodingBoard}
        />
      );
    }
    return rowsArray;
  }

  setColor(selectedColor) {
    this.setState({ actualSelectedColor: selectedColor });
  }
}
