import React from "react";

// TODO: set background color
export class Peg extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        style={{ background: this.props.bgColor }}
        className={"peg"}
        onClick={this.props.setPeg}
      />
    );
  }
}
