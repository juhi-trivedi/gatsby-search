import React, { Component, Fragment } from 'react'
import { navigate } from 'gatsby'
import Layout from '../components/layout'
import withAuthorization from '../components/Session/withAuthorization'
import { StaticQuery, Link, graphql } from 'gatsby'
import HeadText from '../components/headText'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import cookie from 'react-cookies'

const BlogPost = ({ node }) => {
  return (
    <li>
      <img src={node.heroImage.fixed.src} alt={node.title} />
      <div className="blogtext">
        <Link to={node.slug}>{node.title}</Link>
        <p>{node.body.childMarkdownRemark.excerpt}</p>
      </div>
    </li>
  )
}

const BlogListData = ({ data }) => (
  <StaticQuery
    query={graphql`
      query pagesListQuery {
        allContentfulBlog(
          filter: { node_locale: { eq: "en-US" } }
          sort: { fields: [publishDate], order: DESC }
        ) {
          edges {
            node {
              title
              slug
              body {
                childMarkdownRemark {
                  excerpt
                }
              }
              heroImage {
                fixed(height: 300) {
                  src
                }
              }
            }
          }
        }
        allContentfulPages {
          edges {
            node {
              title
              slug
            }
          }
        }
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <>
        <ul className="blog-post">
          {data.allContentfulBlog.edges.map(edge => (
            <BlogPost node={edge.node} key={Math.random()} />
          ))}
        </ul>
      </>
    )}
  />
)
class HomePageBase extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.users.sessionReducer.authUser ? (
          <div className="container">
            <HeadText />
            <BlogListData />
          </div>
        ) : (
          navigate('/')
        )}
      </React.Fragment>
    )
  }
}
const authCondition = authUser => !!authUser

const mapStateToProps = state => {
  return {
    users: state,
  }
}

const HomePage = compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuthorization(authCondition)
)(HomePageBase)
class Home extends Component {
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
            <HomePage />
          </Layout>
      //   ) : (
      //     this.state.route
      //   )}
      // </Fragment>
    )
  }
}
export default () => <Home />
