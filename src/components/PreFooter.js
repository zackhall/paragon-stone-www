import React from 'react'
import { Link } from 'gatsby'

const PreFooter = () => (
  <div className="pre-footer">
    <section className="section has-text-centered">
      <p className="subtitle">
        Like what you see?
      </p>
      <Link
        className="button is-primary is-outlined is-uppercase"
        to="/contact"
      >
        Let's talk
      </Link>
    </section>
  </div>
)

export default PreFooter