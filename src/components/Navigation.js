import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'

import logo from '../img/logo.svg'
import logobw from '../img/logo-bw.svg'
import Dropdown from '../components/Dropdown'



class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawerActive: false
    }
  }

  render() {
    const { navigation, pages} = this.props.data
    const navItems = get(navigation, 'edges[0].node.frontmatter.navItems')
    const collections = groupBy(pages && pages.edges, 'node.frontmatter.collectionKey')

    return (
      <nav className="navigation">
        <div className="container is-fluid">
          <div className="columns is-mobile is-vcentered">
            <div className="column has-text-left is-hidden-touch">
              info@paragonstone.com
            </div>
            <div className="column is-half-desktop">
              <div className="columns">
                <div className="column">
                  <Link to="/">
                    <figure className="image main-logo">
                      <img src={logo} alt="Paragon Stone" style={{ height: '80px' }} />
                    </figure>
                  </Link>
                </div>
              </div>
              <div className="columns is-hidden-touch">
                <div className="column has-text-centered is-uppercase has-text-weight-bold">
                  {
                    navItems.map( ({title, to, childCollection}, index) => (
                      childCollection && childCollection.length ?
                        <Dropdown text={title} to={`/${to}`} key={to}>
                          {
                            collections[childCollection].map(item => (
                              <Link
                                to={`/${item.node.fields.slug}`}
                                key={item.node.fields.slug}
                              >
                                {item.node.frontmatter.title}
                              </Link>
                            ))
                          }
                        </Dropdown> :
                        <div className="desktop-nav-item" key={to}>
                          <Link to={`/${to}`} >
                            {title}
                          </Link>
                        </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="column has-text-right is-hidden-touch">
              (330) 930-0415
            </div>
            <div className="column is-narrow is-hidden-desktop">
              <span
                className="nav-icon"
                onClick={() => this.setState({isDrawerActive: !this.state.isDrawerActive})} >
                menu
              </span>
            </div>
          </div>
        </div>
        <aside className={this.state.isDrawerActive ? 'drawer-menu is-active' : 'drawer-menu' }>
          <div className="has-text-right" >
            <span
              className="nav-icon nav-icon-inverted"
              onClick={() => this.setState({isDrawerActive: !this.state.isDrawerActive})} >
              close
            </span>
          </div>
          <div className="menu-container has-text-centered">
            <div className="menu">
              <p className="menu-label">
                General
              </p>
              <ul className="menu-list">
                {
                  filter(navItems, (item) => !item.childCollection)
                    .map( ({to, title}) =>
                      <li key={to}>
                        <Link to={`/${to}`} >
                          {title}
                        </Link>
                      </li>
                    )
                }
              </ul>
              {
                filter(navItems, (item) => !!item.childCollection)
                  .map( ({to, title, childCollection}) =>
                    <React.Fragment key={to}>
                      <p className="menu-label">
                        {title}
                      </p>
                      <ul className="menu-list">
                        <li>
                          <Link to={`/${to}`}>
                            See all
                          </Link>
                        </li>
                        {
                          collections[childCollection].map(item => (
                            <li key={item.node.fields.slug}>
                              <Link to={`/${item.node.fields.slug}`}>
                                {item.node.frontmatter.title}
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    </ React.Fragment >
                  )
              }
            </div>
          </div>
        </aside>
      </nav>
    )
  }
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        navigation: allMarkdownRemark(
          limit: 1000,
          filter:{ frontmatter: { fileKey: { eq: "navigation"} }}
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
    render={ data => <Navigation data={data} {...props} /> }
  />
)

// export default Navigation