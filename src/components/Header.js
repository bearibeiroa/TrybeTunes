import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    const user = await getUser();
    this.setState({
      userName: user.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading && <Loading />}
        <div data-testid="header-user-name">
          <h4>{ `Olá ${userName}`}</h4>
        </div>
      </header>
    );
  }
}

export default Header;
