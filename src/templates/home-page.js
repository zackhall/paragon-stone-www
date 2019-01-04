import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BannerImage from '../components/BannerImage'
import Tile from '../components/Tile'
import Gallery from '../components/Gallery'
import GalleryItem from '../components/GalleryItem'

import tile1bg from '../img/tile-1-bg.png'
import tile2bg from '../img/tile-2-bg.png'
import tile3bg from '../img/tile-3-bg.png'
import tile4bg from '../img/tile-4-bg.png'

export const HomePageTemplate =({
  title,
  bannerImage,
  gallery,
}) => (
  <>
    {
      bannerImage ?
        <BannerImage
          img={bannerImage}
          title="Naturally inspired beauty."
        /> : null
    }
    <section className="section">
      <div className="columns">
        <div className="column">
          <Link to="/collections">
            <Tile
              size={4}
              number="01"
              title="Find your perfect stone."
              subtitle="Explore all of Paragon’s true-to-life manufactured stone products to find the right shape, texture, and color for your home."
              bgSrc={tile1bg}
              isInverted={true}
            />
          </Link>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <Link to="/brochure">
                <Tile
                  size={2}
                  number="02"
                  title="Request your Paragon Stone brochure."
                  bgSrc={tile2bg}
                  bgSize="75%"
                  bgPosition="top right"
                />
              </Link>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <Link to="/contact">
                <Tile
                  size={1}
                  number="03"
                  title="Find out where you can buy Paragon Stone."
                  bgSrc={tile3bg}
                  bgSize="70%"
                  bgPosition="top right"
                />
              </Link>
            </div>
            <div className="column">
              <Link to="/stone-distributors">
                <Tile
                  size={1}
                  number="04"
                  title="Become an official Paragon distributor."
                  bgSrc={tile4bg}
                  isInverted={true}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <Gallery title="Experience the difference.">
        {
          gallery.map((
              item,
              index,
            ) => (
              <GalleryItem
                offset={index}
                key={index}
                title={item.text}
                image={item.image}
              />
            )
          )
        }
      </Gallery>
    </section>
  </>
)

HomePageTemplate.propTypes = {
  title: PropTypes.string,
  gallery: PropTypes.array,
  bannerImage: PropTypes.object,
}

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const bannerImage = frontmatter.bannerImage &&
    frontmatter.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <HomePageTemplate
        title={frontmatter.title}
        gallery={frontmatter.gallery}
        bannerImage={bannerImage}
      />
    </Layout>
  )
}

export default HomePage

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 1600, maxHeight: 750, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        gallery {
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          text
        }
      }
    }
  }
`