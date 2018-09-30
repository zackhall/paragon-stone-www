import React from 'react'
import { Link } from 'gatsby'

import logobw from '../img/logo-bw.svg'

const PreFooter = () => (
  <div className="footer">
    <section className="section has-text-white">
      <div className="footer-logo">
        <img src={logobw} alt="Paragon Stone Manufactured Stone Veneers Logo" />
      </div>
      <div className="columns">
        <div className="column">
          <p className="subtitle is-uppercase has-text-white">
            Paragon Stone
          </p>
          <p>
            445 South Crown Hill <br />Orrville, OH 44647
          </p>
        </div>
        <div className="column">
          <p className="subtitle is-uppercase has-text-white">
            Contact us
          </p>
          <p>
            P: (330) 930-0415<br/>
            F: (330) 930-0416<br/>
            E: info@paragonstone.com
          </p>
        </div>
        <div className="column">
          <p className="subtitle is-uppercase has-text-white">
            Products
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
        </div>
        <div className="column">
          <p className="subtitle is-uppercase has-text-white">&nbsp;</p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
          <p>
            <Link>Prarie Stone</Link>
          </p>
        </div>
      </div>
    </section>
  </div>
)

export default PreFooter