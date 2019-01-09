import React, { Component, Fragment } from 'react'
import Layout from '../components/layout'
import Map from '../components/Map'
import withAuthorization from '../components/Session/withAuthorization'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'
import { navigate } from 'gatsby'
import AuthUserContext from '../components/Session/AuthUserContext';

// const Contact = () => (

class ContactForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="contactform">
          <h3>Contact Form</h3>
          <form
            action="https://formspree.io/juhi.trivedi@multidots.com"
            method="POST"
          >
            <input type="hidden" name="_next" value="thanks" />
            <p>
              <label>Your name: </label>
              <input type="text" name="name" />
            </p>
            <p>
              <label>Your email: </label>
              <input type="email" name="email" />
            </p>
            <p>
              <label>Message: </label>
              <textarea name="message" />
            </p>
            <p>
              <input type="submit" value="Send" />
            </p>
          </form>
          <div className="gmap">
            <Map />
          </div>
        </div>
      </div>
    )
  }
}

const authCondition = authUser => !!authUser
const mapStateToProps = state => {
  return {
    users: state,
  }
}
const ContactPage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthorization(authCondition)
)(ContactForm)

// export default () => (
//   <Layout>
//     <ContactPage />
//   </Layout>
// )

class Contact extends Component {
  constructor() {
    super()
    this.state = {
      route: '',
    }
   
  }
  componentDidMount() {
    //this.setState({ route: navigate('/') })
  }
  render() {
    const saveData = cookie.load('authUser')
    return (
      // <Fragment>
      //   {saveData ? (
          <Layout>
            <ContactPage />
          </Layout>
      //   ) : (
      //     <AuthUserContext.Consumer>
      //       {navigate('/')}
      //     </AuthUserContext.Consumer>
      //   )}
      // </Fragment>
    )
  }
}

export default Contact
