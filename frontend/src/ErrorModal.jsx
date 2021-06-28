import React from 'react';
import ReactModal from 'react-modal';

export class ErrorModal extends React.Component {
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
        <p className={'error-message'}>Server is not Responding! Please try again later.</p>
      </ReactModal>
    );
  }
}
