import React from "react";
import { Peg } from "./Peg";

export class GameRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codePegs: [],
    };
    this.setPeg = this.setPeg.bind(this);
  }

  render() {
    return (
      <div className={"game-row"}>
        <div className={"code-pegs"}>
          <Peg setPeg={() => this.setPeg(0)} />
          <Peg setPeg={() => this.setPeg(1)} />
          <Peg setPeg={() => this.setPeg(2)} />
          <Peg setPeg={() => this.setPeg(3)} />
        </div>
        <div className={"key-pegs"}>
          <Peg />
          <Peg />
          <Peg />
          <Peg />
        </div>
      </div>
    );
  }

  setPeg(index) {
    if (!this.state.codePegs.includes(this.props.selectedColor)) {
      let tmpCodePegsState = [...this.state.codePegs];
      tmpCodePegsState[index] = this.props.selectedColor;
      this.setState({ codePegs: tmpCodePegsState });
    }

    if (this.state.codePegs.length + 1 === 4) {
      console.log("checking");
      this.setKeyPegs();
    }
  }

  setKeyPegs() {
    //const validIndexes = [0, 1, 2, 3];
    let keyPegsArray = [null, null, null, null];

    //    for (let i = 0; i < 4; i++) {}

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state.codePegs[i] === this.props.gameSolution[j]) {
          // check if same position and same color
          if (i === j) {
            keyPegsArray[this.random(keyPegsArray)] = "2";
          }
          // color is used
          else {
            keyPegsArray[this.random(keyPegsArray)] = "1";
          }
        }
      }
    }
    this.setState({ keyPegs: keyPegsArray });
  }

  // TODO Es werden momentan nur 3 statt 4 Werte gesetzt. Mir ist noch unklar an was das Problem liegt.
  random(keyPegsArray) {
    console.log(keyPegsArray);
    while (1 === 1) {
      const MAX = 4;
      // Get an initial random value.
      // Between 0 and 0.999999 (inclusive)
      const initialRandom = Math.random();
      // Multiply it by our MAX, 4.
      // Will be between 0 and 3.999999 (inclusive)
      const multiplied = initialRandom * MAX;

      // Round it down using Math.floor.
      // Will be 0, 1, 2, or 3.
      const randomIndex = Math.floor(multiplied);
      console.log(randomIndex);

      if (keyPegsArray[randomIndex] === null) {
        return randomIndex;
      }
    }
  }
}
