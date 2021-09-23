import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/logo.png';

import '../styles/style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginOn: false,
      login: '',
      disabled: true,
      fetchCreateUser: false,
    };
  }

    handleClick = async () => {
      const { loginOn, login } = this.state;
      this.setState((prevState) => ({ loginOn: !prevState[loginOn] }));
      const user = { name: login };
      await createUser(user);
      this.setState((prevState) => ({ loginOn: !prevState[loginOn] }));
      this.setState({ fetchCreateUser: true });
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      const LoginLength = 3;
      this.setState({ [name]: value });
      if (value.length < LoginLength) {
        (this.setState({
          disabled: true }));
      } else {
        (this.setState({ disabled: false }));
      }
    }

    render() {
      const { login, disabled, loginOn, fetchCreateUser } = this.state;
      return (
        <div className="login" data-testid="page-login">
          {fetchCreateUser && <Redirect to="/search" />}
          <img src={ logo } alt="Logo TrybeTunes" className="logo" />
          <div>{loginOn && <Loading />}</div>
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
                disabled={ disabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          </label>
        </div>
      );
    }
}

export default Login;
