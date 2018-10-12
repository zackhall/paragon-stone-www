import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
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

export const HomePageTemplate =({
  title,
  gallery,
}) => (
  <>
    <BannerImage
      src={bannerSrc}
      title="Naturally inspired beauty."
    />
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
      <Gallery title="Experience the difference."
                description="Inspiration, a lot of perspiration, and the technology to see it through…that’s the Paragon Stone difference. We only use the finest raw materials. Detail with surfaces that are so true-to-life, the quality and realism have to be seen to be believed."
      >
        {
          gallery.map((
              item,
              index
            ) => (
              <GalleryItem
                offset={index}
                key={index}
                title={item.text}
                src={item.image}
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
}

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <HomePageTemplate
        title={frontmatter.title}
        gallery={frontmatter.gallery}
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
        gallery {
          image
          text
        }
      }
    }
  }
`