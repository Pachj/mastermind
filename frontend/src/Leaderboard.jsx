import React from 'react';
import ReactModal from 'react-modal';

export class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        ariaHideApp={false}
        onRequestClose={this.props.closeLeaderboard}
        shouldCloseOnOverlayClick={true}
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
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{this.state.leaderboardElements}</tbody>
          </table>
        </div>
      </ReactModal>
    );
  }

  componentDidMount() {
    this.createEntriesElements();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.createEntriesElements();
    }
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
