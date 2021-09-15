import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="login"
          />
        </form>
      </div>
    );
  }
}

export default Login;
