import React from "react";

export class ColorSelection extends React.Component {
  render() {
    return (
      <div id={"color-selection"}>
        <button
          style={{ background: "red" }}
          onClick={() => this.props.setColor(1)}
        />
        <button
          style={{ background: "blue" }}
          onClick={() => this.props.setColor(2)}
        />
        <button
          style={{ background: "green" }}
          onClick={() => this.props.setColor(3)}
        />
        <button
          style={{ background: "yellow" }}
          onClick={() => this.props.setColor(4)}
        />
        <button
          style={{ background: "brown" }}
          onClick={() => this.props.setColor(5)}
        />
        <button
          style={{ background: "black" }}
          onClick={() => this.props.setColor(6)}
        />
      </div>
    );
  }
}
