import React from 'react';

// TODO: disable keyPegs
export class Peg extends React.Component {
  render() {
    return (
      <button
        style={{ background: this.props.bgColor }}
        className={'peg'}
        onClick={this.props.setPeg}
      />
    );
  }
}
