import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'

import logo from '../img/logo.svg'
import Dropdown from '../components/Dropdown'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawerActive: false,
    }

    this.styles = {
      body: {
        height: '100vh',
        overflow: 'hidden',
      },
    }
  }

  componentDidUpdate() {
    // prevent scrolling when drawer open by hiding overflow on body.
    for (let i in this.styles.body) {
      document.body.style[i] = !!this.state.isDrawerActive
        ? this.styles.body[i]
        : null
    }
  }

  componentWillUnmount() {
    // make sure to unlock the scrolling on page body.
    for (var i in this.styles.body) {
      document.body.style[i] = null
    }
  }

  render() {
    const { navigation, pages } = this.props.data
    const navItems = get(navigation, 'edges[0].node.frontmatter.navItems')
    const collections = groupBy(
      pages && pages.edges,
      'node.frontmatter.collectionKey'
    )

    return (
      <nav className="navigation">
        <span
          className="navigation--mobile-menu-btn nav-icon is-hidden-desktop"
          onClick={() =>
            this.setState({ isDrawerActive: !this.state.isDrawerActive })
          }
        >
          menu
        </span>
        <div className="section">
          <div className="columns is-mobile is-vcentered">
            <div className="column has-text-left is-hidden-touch">
              info@paragonstone.com
            </div>
            <div className="column is-half-desktop navigation--main">
              <div className="nav-logo">
                <Link to="/">
                  <img src={logo} alt="Paragon Stone" />
                </Link>
              </div>
              <div className="is-hidden-touch has-text-centered is-uppercase has-text-weight-bold">
                {navItems.map(
                  ({ title, to, childCollection }, index) =>
                    childCollection && childCollection.length ? (
                      <Dropdown text={title} to={`/${to}`} key={to}>
                        {collections[childCollection].map(item => (
                          <Link
                            to={`/${item.node.fields.slug}`}
                            key={item.node.fields.slug}
                          >
                            {item.node.frontmatter.title}
                          </Link>
                        ))}
                      </Dropdown>
                    ) : (
                      <div className="desktop-nav-item" key={to}>
                        <Link to={`/${to}`}>{title}</Link>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="column has-text-right is-hidden-touch">
              (330) 930-0415
            </div>
          </div>
        </div>
        <aside
          className={
            this.state.isDrawerActive ? 'drawer-menu is-active' : 'drawer-menu'
          }
        >
          <div className="nav-controls">
            <span
              className="nav-icon nav-icon-inverted"
              onClick={() =>
                this.setState({ isDrawerActive: !this.state.isDrawerActive })
              }
            >
              close
            </span>
          </div>
          <div className="menu-container has-text-centered">
            <div className="menu">
              <p className="menu-label">General</p>
              <ul className="menu-list">
                {filter(navItems, item => !item.childCollection).map(
                  ({ to, title }) => (
                    <li key={to}>
                      <Link to={`/${to}`}>{title}</Link>
                    </li>
                  )
                )}
              </ul>
              {filter(navItems, item => !!item.childCollection).map(
                ({ to, title, childCollection }) => (
                  <React.Fragment key={to}>
                    <p className="menu-label">{title}</p>
                    <ul className="menu-list">
                      <li>
                        <Link to={`/${to}`}>See all</Link>
                      </li>
                      {collections[childCollection].map(item => (
                        <li key={item.node.fields.slug}>
                          <Link to={`/${item.node.fields.slug}`}>
                            {item.node.frontmatter.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </aside>
      </nav>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        navigation: allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { fileKey: { eq: "navigation" } } }
        ) {
          edges {
            node {
              frontmatter {
                navItems {
                  title
                  to
                  childCollection
                }
              }
            }
          }
        }
        pages: allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                collectionKey
              }
            }
          }
        }
      }
    `}
    render={data => <Navigation data={data} {...props} />}
  />
)

// export default Navigation
