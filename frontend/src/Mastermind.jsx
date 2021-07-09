import React from 'react';
import { Game } from './Game';
import { WelcomeScreen } from './WelcomeScreen';
import { Leaderboard } from './Leaderboard';
import { ErrorModal } from './ErrorModal';
import { GameEndModal } from './GameEndModal';

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
      showGameEndModal: false,
      hasWon: false,
      gameKey: 0,
    };

    this.handleNetworkError = this.handleNetworkError.bind(this);
    this.closeWelcomeModal = this.closeWelcomeModal.bind(this);
    this.closeLeaderboard = this.closeLeaderboard.bind(this);
    this.showLeaderboard = this.showLeaderboard.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.openGameEndModal = this.openGameEndModal.bind(this);
    this.closeGameEndModal = this.closeGameEndModal.bind(this);
  }

  // TODO: refactor render logic
  render() {
    /*    let renderContent;

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
    }*/

    return (
      <div>
        <h1>Mastermind</h1>
        <div id={'leaderboard-button-container'}>
          <button className={'username-button'} onClick={this.showLeaderboard}>
            Show Leaderboard
          </button>
        </div>
        <Game key={this.state.gameKey} endGame={this.endGame} />
        <Leaderboard
          handleNetworkError={this.handleNetworkError}
          isOpen={this.state.showLeaderboard}
          closeLeaderboard={this.closeLeaderboard}
        />
        <ErrorModal isOpen={this.state.showErrorModal} />
        <WelcomeScreen
          isOpen={this.state.showWelcomeScreen}
          closeModal={this.closeWelcomeModal}
          setUsername={this.setUsername}
          startGame={this.startGame}
        />
        <GameEndModal
          isOpen={this.state.showGameEndModal}
          closeModal={this.closeGameEndModal}
          hasWon={this.state.hasWon}
          startGame={this.startGame}
        />
        <footer>Made by Henry Joerg</footer>
      </div>
    );
  }

  setUsername(username) {
    this.setState({ username: username });
  }

  // TODO: doesnt replace game and decoding board
  startGame() {
    // check if backend is responding, or throw an error
    fetch('http://localhost:8080/score').catch((err) => {
      this.handleNetworkError(err);
    });

    const newGameKey = this.state.gameKey + 1;
    this.setState({ gameKey: newGameKey, showGameEndModal: false, hasWon: false });
  }

  endGame(gameIsWon, score) {
    if (gameIsWon) {
      this.setState({ hasWon: false });
      this.setLeaderboardEntry(score);
    }

    this.setState({ showGameEndModal: true });
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

  openWelcomeModal() {
    this.setState({ showWelcomeScreen: true });
  }

  closeWelcomeModal() {
    this.setState({ showWelcomeScreen: false });
  }

  openGameEndModal() {
    this.setState({ showGameEndModal: true });
  }

  closeGameEndModal() {
    this.setState({ showGameEndModal: false });
  }
}
