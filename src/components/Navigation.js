import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import logobw from '../img/logo-bw.svg'



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
          <div className="columns is-vcentered">
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
                <div className="column has-text-centered">
                  About
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
              className="nav-icon"
              onClick={() => this.setState({isDrawerActive: !this.state.isDrawerActive})} >
              close
            </span>
          </div>
        </aside>
      </nav>
    )
  }
}

export default Navigation