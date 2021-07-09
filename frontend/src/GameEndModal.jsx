import React from 'react';
import ReactModal from 'react-modal';

export class GameEndModal extends React.Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        onRequestClose={this.props.closeModal}
        shouldCloseOnOverlayClick={true}
        startGame={this.props.startGame}
        style={{
          content: {
            width: '670px',
            margin: 'auto',
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <div className={'game-end-container'}>
          <p className={'error-message'}>
            {this.props.hasWon === true ? 'You have Won!' : "You haven't won. You will get there!"}
          </p>
          <button className={'username-button'} onClick={this.props.startGame}>
            Start New Game
          </button>
        </div>
      </ReactModal>
    );
  }
}
