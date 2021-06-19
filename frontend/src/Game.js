import React from "react";
import { GameRow } from "./GameRow";
import { ColorSelection } from "./ColorSelection";

// TODO styling

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 12,
      numberOfColors: 6,
      decodingBoard: [1, 2, 3, 4],
      actualSelectedColor: 1,
      isWon: false,
    };

    this.setColor = this.setColor.bind(this);
    this.checkIfGameIsWon = this.checkIfGameIsWon.bind(this);
  }

  render() {
    let rowsArray = this.generateRowsArray();
    return (
      <div id={"game"}>
        <ColorSelection setColor={this.setColor} />
        <div id={"rows"}>{rowsArray}</div>
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
          checkIfGameIsWon={this.checkIfGameIsWon}
        />
      );
    }
    return rowsArray;
  }

  setColor(selectedColor) {
    this.setState({ actualSelectedColor: selectedColor });
  }

  checkIfGameIsWon(keyPegs) {
    let isWon = true;

    keyPegs.forEach((peg) => {
      if (peg !== 2) {
        isWon = false;
      }
    });

    this.setState({ isWon: isWon });
  }
}
