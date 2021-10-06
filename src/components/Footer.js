import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import chunk from 'lodash/chunk'

import logobw from '../img/logo-bw.svg'

const Footer = ({ data }) => {
  const links =
    data &&
    data.pages &&
    data.pages.edges.map((page) => (
      <p key={page.node.id}>
        <Link to={page.node.fields.slug} className="has-text-white">
          {page.node.frontmatter.title}
        </Link>
      </p>
    ))

  const [linkGroup1, linkGroup2] = chunk(links, Math.ceil(links.length / 2))

  return (
    <div className="footer">
      <section className="section has-text-white has-text-centered-touch">
        <div className="footer-logo">
          <img
            src={logobw}
            alt="Paragon Stone Manufactured Stone Veneers Logo"
          />
        </div>
        <div className="columns">
          <div className="column">
            <p className="subtitle is-uppercase has-text-white">
              Paragon Stone
            </p>
            <p>
              445 South Crown Hill <br />
              Orrville, OH 44667
            </p>
          </div>
          <div className="column">
            <p className="subtitle is-uppercase has-text-white">Contact us</p>
            <p>
              P: (330) 930-0415
              <br />
              F: (330) 930-0416
              <br />
              E: info@paragonstone.com
            </p>
          </div>
          <div className="column">
            <p className="subtitle is-uppercase has-text-white">Products</p>
            {linkGroup1}
          </div>
          <div className="column">
            <p className="subtitle is-uppercase has-text-white is-hidden-touch">
              &nbsp;
            </p>
            {linkGroup2}
          </div>
        </div>
      </section>
    </div>
  )
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        pages: allMarkdownRemark(
          filter: { frontmatter: { collectionKey: { eq: "products" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={(data) => <Footer data={data} {...props} />}
  />
)
