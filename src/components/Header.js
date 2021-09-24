import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/skip-image.png';
import userIcon from '../images/account_circle_.png';

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
            <span className="username">
              <img src={ userIcon } alt="Ícone de usuário" width="35" />
              {userName}
            </span>
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
