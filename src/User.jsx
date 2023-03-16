import React, { Component } from 'react';

class User extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    this.fetchUser();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.fetchUser();
    }
  };

  fetchUser = () => {
    const { match } = this.props;
    fetch(`https://api.github.com/users/${match.params.userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        this.setState({
          user: data,
        });
      });
  };

  render() {
    const { user } = this.state;
    if (!user) {
      return null;
    }
    return (
      <div className="user">
        <img
          alt="User Avatar"
          src={this.state.user.avatar_url}
          className="user__avatar"
        />
        <div className="user__info">
          <span className="user__name">{this.state.user.name}</span>
          <span className="user__location">{this.state.user.location}</span>
        </div>
      </div>
    );
  }
}

export default User;

// {this.state.user}
