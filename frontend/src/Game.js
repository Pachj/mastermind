import React from "react";
import { GameRow } from "./GameRow";
import { ColorSelection } from "./ColorSelection";
import { colors } from "./common";

// TODO styling
// TODO hide not current GameRow
// TODO colors palette

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 12,
      numberOfColors: 6,
      decodingBoard: this.generateDecodingBoard(),
      actualSelectedColor: 1,
      isWon: false,
      rowCounter: 0,
      username: "Patrick",
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
        this.setState({ rowCounter: this.state.rowCounter + 1 });
      }
    });

    this.setState({ isWon: isWon });

    // TODO
    fetch("http://localhost:8080/score", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: this.state.score,
        username: this.state.username,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  generateDecodingBoard() {
    const colorsAsArray = Object.keys(colors);
    let decodingBoard = [];

    let boardIsComplete = false;
    while (!boardIsComplete) {
      let isUnique = false;
      while (!isUnique) {
        let tmpColor = parseInt(
          colorsAsArray[Math.floor(Math.random() * colorsAsArray.length)]
        );
        if (decodingBoard.indexOf(tmpColor) === -1) {
          isUnique = true;
          decodingBoard.push(tmpColor);
        }
      }
      if (decodingBoard.length === 4) {
        boardIsComplete = true;
      }
    }
    console.log(decodingBoard);
    return decodingBoard;
  }
}
