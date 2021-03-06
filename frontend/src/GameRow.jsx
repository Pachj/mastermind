import React from "react";
import { Peg } from "./Peg";
import { colors } from "./common";

export class GameRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codePegs: [],
      codePegsBgColors: [
        "-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))",
        "-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))",
        "-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))",
        "-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))",
      ],
      keyPegsElements: [],
    };
    this.setPeg = this.setPeg.bind(this);
  }

  render() {
    return (
      <div className={"game-row"}>
        <div className={"code-pegs"}>
          <Peg
            bgColor={this.state.codePegsBgColors[0]}
            setPeg={() => this.setPeg(0)}
          />
          <Peg
            bgColor={this.state.codePegsBgColors[1]}
            setPeg={() => this.setPeg(1)}
          />
          <Peg
            bgColor={this.state.codePegsBgColors[2]}
            setPeg={() => this.setPeg(2)}
          />
          <Peg
            bgColor={this.state.codePegsBgColors[3]}
            setPeg={() => this.setPeg(3)}
          />
        </div>
        <div className={"key-pegs"}>{this.state.keyPegsElements}</div>
      </div>
    );
  }

  setPeg(index) {
    if (!this.state.codePegs.includes(this.props.selectedColor)) {
      let tmpCodePegsState = [...this.state.codePegs];
      tmpCodePegsState[index] = this.props.selectedColor;

      let tmpBgColors = [...this.state.codePegsBgColors];
      tmpBgColors[index] = colors[this.props.selectedColor];
      this.setState({ codePegsBgColors: tmpBgColors });

      this.setState({ codePegs: tmpCodePegsState }, () => {
        // if all pegs are set
        if (
          !this.state.codePegs.includes(undefined) &&
          this.state.codePegs.length === 4
        ) {
          this.finishRow(tmpCodePegsState);
        }
      });
    }
  }

  finishRow() {
    let keyPegsArray = [null, null, null, null];

    // loop through user input
    for (let i = 0; i < 4; i++) {
      // loop through solution
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

    this.setState({ keyPegs: this.shuffle(keyPegsArray) }, () => {
      this.generateKeyPegsElements();
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

  // TODO own KeyPeg Component
  generateKeyPegsElements() {
    let elements = [];
    let keyCounter = 0;
    this.state.keyPegs.forEach((peg) => {
      if (peg === 2) {
        elements.push(
          <Peg key={keyCounter} bgColor={"green"} onClick={this.props.setPeg} />
        );
      } else if (peg === 1) {
        elements.push(
          <Peg
            key={keyCounter}
            bgColor={"orange"}
            onClick={this.props.setPeg}
          />
        );
      } else {
        elements.push(
          <Peg
            key={keyCounter}
            bgColor={
              "-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59))"
            }
            onClick={this.props.setPeg}
          />
        );
      }
      keyCounter++;
    });
    console.log(elements);
    this.setState({ keyPegsElements: elements });
  }
}
