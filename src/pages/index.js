import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BannerImage from '../components/BannerImage'
import Tile from '../components/Tile'
import Gallery from '../components/Gallery'
import GalleryItem from '../components/GalleryItem'

import bannerSrc from '../img/banner-image.png'
import tile1bg from '../img/tile-1-bg.png'
import tile2bg from '../img/tile-2-bg.png'
import tile3bg from '../img/tile-3-bg.png'
import tile4bg from '../img/tile-4-bg.png'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <BannerImage src={bannerSrc} />
        <section className="section">
          <div className="columns">
            <div className="column">
              <Tile
                size={4}
                number="01"
                title="Find your perfect stone."
                subtitle="Explore all of Paragon’s true-to-life manufactured stone products to find the right shape, texture, and color for your home."
                bgSrc={tile1bg}
                isInverted={true}
              />
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <Tile
                    size={2}
                    number="02"
                    title="Request your Paragon Stone brochure."
                    bgSrc={tile2bg}
                    bgSize="75%"
                    bgPosition="top right"
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <Tile
                    size={1}
                    number="03"
                    title="Find out where you can buy Paragon Stone."
                    bgSrc={tile3bg}
                    bgSize="70%"
                    bgPosition="top right"
                  />
                </div>
                <div className="column">
                  <Tile
                    size={1}
                    number="04"
                    title="Become an official Paragon distributor."
                    bgSrc={tile4bg}
                    isInverted={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <Gallery>
            <GalleryItem offset={0} src="https://source.unsplash.com/weekly?water" />
            <GalleryItem offset={1} src="https://source.unsplash.com/weekly?tree" />
            <GalleryItem offset={2} src="https://source.unsplash.com/weekly?car" />
          </Gallery>
        </section>


      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
