import React from 'react';
import { Game } from './Game';
import { WelcomeScreen } from './WelcomeScreen';

// TODO: hide Welcome Screen after usename is entered
// TODO: show leaderboard
// TODO: start new game button
// TODO: js files to jsx

export class Mastermind extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      game: <></>,
      gameIsRunning: false,
    };

    this.setUsername = this.setUsername.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  render() {
    let renderContent;

    if (this.state.gameIsRunning) {
      renderContent = <Game endGame={this.endGame} />;
    } else {
      renderContent = <WelcomeScreen startGame={this.startGame} setUsername={this.setUsername} />;
    }

    return <div>{renderContent}</div>;
  }

  setUsername(username) {
    this.setState({ username: username });
  }

  startGame() {
    this.setState({ gameIsRunning: true });
  }

  endGame(gameIsWon, score) {
    if (gameIsWon) {
      this.setLeaderboardEntry(score);
    }
    this.setState({ gameIsRunning: false });
  }

  setLeaderboardEntry(score) {
    console.log(this.state.username);
    // TODO
    fetch('http://localhost:8080/score', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score,
        username: this.state.username,
      }),
    });
  }
}
