import React from 'react';

export class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.leaderboardElements}</tbody>
        </table>
        <button onClick={this.props.closeLeaderboard}>Close Leaderboard</button>
      </div>
    );
  }

  componentDidMount() {
    this.createEntriesElements();
  }

  createEntriesElements() {
    fetch('http://localhost:8080/score')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        let leaderboardElements = [];

        json.forEach((entry) => {
          console.log(entry);
          leaderboardElements.push(
            <tr>
              <td>{entry.username}</td>
              <td>{entry.score}</td>
            </tr>,
          );
        });

        this.setState({ leaderboardElements: leaderboardElements });
      })
      .catch((err) => {
        this.props.handleNetworkError(err);
      });
  }
}
