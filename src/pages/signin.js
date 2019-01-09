import React, { Component, Fragment } from 'react'
import Layout from '../components/layout'

import SignInForm from '../components/SignIn'
import { SignUpLink } from '../components/SignUp'
import { PasswordForgetLink } from '../components/PasswordForget'
import { navigate } from 'gatsby'
import * as routes from '../constants/routes'
import getFirebase from '../components/Firebase'
import FirebaseContext from '../components/Firebase/FirebaseContext'
import withAuthentication from '../components/Session/withAuthentication'
import { connect } from 'react-redux'
import { compose } from 'recompose'
class SignInPage extends Component {
  state = {
    firebase: null,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const database = import('firebase/database')

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0])
      this.setState({ firebase })
    })
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <SignInPageData {...this.props} />
      </FirebaseContext.Provider>
    )
  }
}

const SignInPageData = props => {
  return (
    <Fragment>
        {
          props.users.sessionReducer.authUser ? (
            navigate(routes.LANDING)
          ) : (
            <Layout>
              <div className="container signinpage">
                {' '}
                <h1>Log In</h1> <SignInForm /> <PasswordForgetLink />{' '}
                <SignUpLink />{' '}
              </div>
            </Layout>
          )
        }
    </Fragment>
  )
}
const mapStateToProps = state => {
  return {
    users: state,
  }
}

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthentication
)(SignInPage)