import React, { Component } from 'react';
import { Link } from 'gatsby';

import * as routes from '../../constants/routes';
import { withFirebase } from '../Firebase/FirebaseContext';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={event =>
            this.setState({ [event.target.name]: event.target.value })
          }
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="forgotpwd_link">
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export { PasswordForgetLink };

export default withFirebase(PasswordForgetForm);
