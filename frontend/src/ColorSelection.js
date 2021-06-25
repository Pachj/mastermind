import React from "react";
import { colors } from "./common";

export class ColorSelection extends React.Component {
  render() {
    return (
      <div id={"color-selection"}>
        <button
          style={{ background: colors[1] }}
          onClick={() => this.props.setColor(1)}
        />
        <button
          style={{ background: colors[2] }}
          onClick={() => this.props.setColor(2)}
        />
        <button
          style={{ background: colors[3] }}
          onClick={() => this.props.setColor(3)}
        />
        <button
          style={{ background: colors[4] }}
          onClick={() => this.props.setColor(4)}
        />
        <button
          style={{ background: colors[5] }}
          onClick={() => this.props.setColor(5)}
        />
        <button
          style={{ background: colors[6] }}
          onClick={() => this.props.setColor(6)}
        />
      </div>
    );
  }
}
