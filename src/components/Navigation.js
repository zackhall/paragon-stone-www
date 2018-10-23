import React from 'react'
import { Link } from 'gatsby'
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
                    <figure className="image">
                      <img src={logo} alt="Paragon Stone" style={{ height: '80px' }} />
                    </figure>
                  </Link>
                </div>
              </div>
              <div className="columns is-hidden-touch">
                <div className="column has-text-centered is-uppercase has-text-weight-bold">
                  <Dropdown text="Products" to="/collections">
                    <Link to='/products/ledgestone/'>
                      Ledgestone
                    </Link>
                    <Link to='/products/prairie-stone/'>
                      Prairie Stone
                    </Link>
                  </Dropdown>
                  <span className="has-margin-x-small">/</span>
                  <Link to='/about'>
                    About
                  </Link>
                  <span className="has-margin-x-small">/</span>
                  <Link to='/gallery'>
                    Gallery
                  </Link>
                  <span className="has-margin-x-small">/</span>
                  <Link to='/contact'>
                    Contact
                  </Link>
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
                <li>
                  <Link>About</Link>
                </li>
                <li>
                  <Link>Contact</Link>
                </li>
              </ul>
              <p className="menu-label">
                Products
              </p>
              <ul className="menu-list">
                <Link>Prarie Stone</Link>
                <Link>Ledgestone</Link>
                <Link>Summit Ledge</Link>
                <Link>Limestone</Link>
                <Link>Fieldstone</Link>
                <Link>Manor Stone</Link>
                <Link>River Rock</Link>
                <Link>Stacked Stone</Link>
                <Link>Ashlar Stone</Link>
                <Link>Foundation Stone</Link>
                <Link>Brick</Link>
                <Link>Accessories</Link>
              </ul>
            </div>
          </div>
        </aside>
      </nav>
    )
  }
}

export default Navigation