import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/skip-image.png';

import '../styles/style.css';

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
      <>
        <header data-testid="header-component">
          <div data-testid="header-user-name" className="top-header">
            <img src={ logo } alt="Logo TrybeTunes" />
            <div className="username">
              <h4>{userName}</h4>
            </div>
          </div>
          <nav className="navbar">
            <Link
              to="/search"
              data-testid="link-to-search"
              className="nav-item"
            >
              Pesquisa
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="nav-item"
            >
              Favoritas
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="nav-item"
            >
              Perfil
            </Link>
          </nav>
        </header>
        <h1>{loading && <Loading />}</h1>
      </>
    );
  }
}

export default Header;
