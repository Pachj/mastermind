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
      this.setState({ codePegs: tmpCodePegsState }, () => {
        if (this.state.codePegs.length === 4) {
          this.setKeyPegs(tmpCodePegsState);
        }
      });
    }
  }

  setKeyPegs() {
    let keyPegsArray = [null, null, null, null];

    for (let i = 0; i < 4; i++) {
      //console.log(i);
      for (let j = 0; j < 4; j++) {
        if (this.state.codePegs[i] === this.props.gameSolution[j]) {
          // check if same position and same color
          if (i === j) {
            keyPegsArray[i] = 2;
          }
          // color is used
          else {
            keyPegsArray[i] = 1;
          }
        }
      }
    }
    keyPegsArray = this.shuffle(keyPegsArray);
    this.setState({ keyPegs: keyPegsArray }, () => {
      this.props.checkIfGameIsWon(this.state.keyPegs);
    });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
