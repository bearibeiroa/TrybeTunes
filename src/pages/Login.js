import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import logo from '../images/logo.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginOn: false,
      login: '',
      validation: true,
      fetchCreateUser: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

    handleClick = async () => {
      const { loginOn, login } = this.state;
      this.setState((prevState) => ({ loginOn: !prevState[loginOn] }));
      const user = { name: login };
      await createUser(user);
      this.setState((prevState) => ({ loginOn: !prevState[loginOn] }));
      this.setState({ fetchCreateUser: true });
    }

    handleChange({ target }) {
      const { name, value } = target;
      const LoginLength = 3;
      this.setState({ [name]: value });
      if (value.length < LoginLength) {
        (this.setState({ validation: true }));
      } else {
        (this.setState({ validation: false }));
      }
    }

    render() {
      const { login, validation, loginOn, fetchCreateUser } = this.state;
      return (
        <div className="login" data-testid="page-login">
          {fetchCreateUser && <Redirect to="/search" />}
          <img src={ logo } alt="Logo TrybeTunes" className="logo" />
          <label htmlFor="login">
            <form className="login-form">
              <input
                type="text"
                data-testid="login-name-input"
                name="login"
                value={ login }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ validation }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </label>
          {loginOn && <p>Carregando...</p>}
        </div>
      );
    }
}

export default Login;
