import React, { Component, Fragment } from 'react'

import Layout from '../components/layout'
import SignUpForm from '../components/SignUp'
import { navigate } from 'gatsby'
import * as routes from '../constants/routes'
import { connect } from 'react-redux'
class SignUpPage extends Component {
  render() {
    const { users } = this.props
    return (
      <Fragment>
        {users.sessionReducer.authUser ? (
          navigate(routes.LANDING)
        ) : (
          <Layout>
            <div className="container signinpage">
              {' '}
              <h1>Sign Up</h1> <SignUpForm />{' '}
            </div>
          </Layout>
        )}
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    users: state,
  }
}
const Page = connect(mapStateToProps)(SignUpPage)
export default () => <Page />
