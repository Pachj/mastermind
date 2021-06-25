import React from "react";
import { GameRow } from "./GameRow";
import { ColorSelection } from "./ColorSelection";
import { colors } from "./common";

// TODO styling
// TODO hide not current GameRow
// TODO key
// TODO colors palette
// TODO random decodingBoard generation

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 12,
      numberOfColors: 6,
      decodingBoard: [1, 2, 3, 4],
      actualSelectedColor: 1,
      isWon: false,
      test: this.generateDecodingBoard,
    };

    this.setColor = this.setColor.bind(this);
    this.checkIfGameIsWon = this.checkIfGameIsWon.bind(this);
  }

  render() {
    let rowsArray = this.generateRowsArray();
    return (
      <div id={"game"}>
        <h1>Mastermind</h1>
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
          key={`gameRow-${i}`}
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

  generateDecodingBoard() {
    let decodingBoard = [];
    let boardIsComplete = false;
    let colorsAsArray;

    console.log("before loop");
    for (let color in colors) {
      console.log("loop");
      colorsAsArray.push(color);
    }
    console.log(colorsAsArray);

    //while (!boardIsComplete) {}
    return colorsAsArray;
  }
}
