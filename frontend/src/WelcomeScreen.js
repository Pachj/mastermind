import React from "react";

export class WelcomeScreen extends React.Component {
  render() {
    return (<div>
      <input type={"text"} onChange={(input) => {this.props.setUsername(input.target.value)}}/>
      <button onClick={this.props.startGame}>Start Game</button>
    </div>);
  }
}
