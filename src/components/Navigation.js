import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import logobw from '../img/logo-bw.svg'

const Navigation = () => (
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
      </div>
    </div>
  </nav>
)

export default Navigation