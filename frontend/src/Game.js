import React from 'react';
import { GameRow } from './GameRow';
import { ColorSelection } from './ColorSelection';
import { colors } from './common';

// TODO styling
// TODO hide not current GameRow
// TODO colors palette

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 12,
      decodingBoard: this.generateDecodingBoard(),
      actualSelectedColor: 1,
      score: 0,
    };

    this.setColor = this.setColor.bind(this);
    this.checkIfGameIsWon = this.checkIfGameIsWon.bind(this);
  }

  render() {
    let rowsArray = this.generateRowsArray();
    return (
      <div id={'game'}>
        <h1>Mastermind</h1>
        <ColorSelection setColor={this.setColor} />
        <div id={'rows'}>{rowsArray}</div>
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
        />,
      );
    }
    return rowsArray;
  }

  setColor(selectedColor) {
    this.setState({ actualSelectedColor: selectedColor });
  }

  generateDecodingBoard() {
    const colorsAsArray = Object.keys(colors);
    let decodingBoard = [];

    let boardIsComplete = false;
    while (!boardIsComplete) {
      let isUnique = false;
      while (!isUnique) {
        let tmpColor = parseInt(colorsAsArray[Math.floor(Math.random() * colorsAsArray.length)]);
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

  checkIfGameIsWon(keyPegs) {
    let isWon = true;
    const score = this.state.score + 1;

    keyPegs.forEach((peg) => {
      if (peg !== 2) {
        isWon = false;
      }
    });

    console.log(score);
    console.log(this.state.numberOfRows);

    if (
      isWon ||
      score === this.state.numberOfRows ||
      (isWon && score === this.state.numberOfRows)
    ) {
      this.props.endGame(isWon, score);
    }

    this.setState({ score: score });
  }
}
