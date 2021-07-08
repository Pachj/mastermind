import React from 'react';
import { Game } from './Game';
import { WelcomeScreen } from './WelcomeScreen';
import { Leaderboard } from './Leaderboard';
import { ErrorModal } from './ErrorModal';

// TODO: start new game button

export class Mastermind extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      gameIsRunning: false,
      showLeaderboard: false,
      showErrorModal: false,
      showWelcomeScreen: true,
    };

    this.handleNetworkError = this.handleNetworkError.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.closeLeaderboard = this.closeLeaderboard.bind(this);
    this.showLeaderboard = this.showLeaderboard.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  // TODO: refactor render logic
  render() {
    let renderContent;

    if (this.state.showLeaderboard) {
      renderContent = (
        <Leaderboard
          handleNetworkError={this.handleNetworkError}
          closeLeaderboard={this.closeLeaderboard}
        />
      );
    } else {
      if (this.state.gameIsRunning) {
        renderContent = (
          <>
            <button onClick={this.showLeaderboard}>Show Leaderboard</button>
            <Game endGame={this.endGame} />
          </>
        );
      }
    }

    // TODO: Leaderboard as Modal
    return (
      <div>
        <h1>Mastermind</h1>
        {renderContent}
        <ErrorModal isOpen={this.state.showErrorModal} />
        <WelcomeScreen
          isOpen={this.state.showWelcomeScreen}
          closeModal={this.handleCloseModal}
          setUsername={this.setUsername}
          startGame={this.startGame}
        />
        <footer>Made by Henry Joerg</footer>
      </div>
    );
  }

  setUsername(username) {
    this.setState({ username: username });
  }

  startGame() {
    // check if backend is responding, or throw an error
    fetch('http://localhost:8080/score').catch((err) => {
      this.handleNetworkError(err);
    });

    this.setState({ gameIsRunning: true });
  }

  endGame(gameIsWon, score) {
    if (gameIsWon) {
      this.setLeaderboardEntry(score);
    }
    this.setState({ gameIsRunning: false });
  }

  setLeaderboardEntry(score) {
    fetch('http://localhost:8080/score', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: score,
        username: this.state.username,
      }),
    }).catch((err) => {
      this.handleNetworkError(err);
    });
  }

  showLeaderboard() {
    this.setState({ showLeaderboard: true });
  }

  closeLeaderboard() {
    this.setState({ showLeaderboard: false });
  }

  handleNetworkError(err) {
    this.setState({ showErrorModal: true });
  }

  handleOpenModal() {
    this.setState({ showWelcomeScreen: true });
  }

  handleCloseModal() {
    this.setState({ showWelcomeScreen: false });
  }
}
