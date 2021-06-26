import React from "react";
import {Game} from "./Game";
import {WelcomeScreen} from "./WelcomeScreen";

export class Mastermind extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      game: <></>,
    };

    this.setUsername = this.setUsername.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  render() {
    return (<div><WelcomeScreen startGame={this.startGame} setUsername={this.setUsername} />
    {this.state.game}</div>);
  }

  setUsername(username) {
    this.setState({username: username});
  }

  startGame() {
    this.setState({game: <Game endGame={this.endGame}/>});
  }

  endGame(gameIsWon, score) {
    if (gameIsWon) {
      this.setLeaderboardEntry(score);
    }
  }

  setLeaderboardEntry(score) {
    // TODO
    fetch("http://localhost:8080/score", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: score,
        username: this.state.username,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

}
