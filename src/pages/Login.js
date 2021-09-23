import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      const { history } = this.props;
      this.setState((prevState) => ({ loginOn: !prevState[loginOn] }));
      const user = { name: login };
      await createUser(user);
      history.push('/search');
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
      const { login, disabled, loginOn } = this.state;
      if (loginOn) return <Loading />;
      return (
        <div className="login" data-testid="page-login">
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
