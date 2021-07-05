import React from 'react';
import ReactModal from 'react-modal';

export class WelcomeScreen extends React.Component {
  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
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
        <div>
          <label htmlFor={'username-input'}>Username</label>
          <input
            type={'text'}
            onChange={(input) => {
              this.props.setUsername(input.target.value);
            }}
            id={'username-input'}
          />
          <button
            onClick={() => {
              this.props.closeModal();
              this.props.startGame();
            }}
          >
            Start Game
          </button>
        </div>
      </ReactModal>
    );
  }
}
