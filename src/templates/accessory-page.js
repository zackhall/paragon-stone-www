import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import BannerImage from '../components/BannerImage'
import Gallery from '../components/Gallery'
import GalleryItem from '../components/GalleryItem'

export const AccessoryPageTemplate = ({
  title,
  description,
  techSpecs,
  bannerImage,
  finishes,
  gallery,
}) => (
  <>
    <Helmet title={`${title} | Products | Paragon Stone Architectural Stone Veneers`} />

    {
        bannerImage ?
            <BannerImage
              img={bannerImage}
              title={title}
            /> : null
      }

    <section className="section has-padding-y-large">
      {
        finishes && finishes.length ? (
          finishes.map((finish, index) =>(
            <div className="columns">
              <div className="column is-3">
                <div className="subtitle">
                  {finish.name}
                </div>
              </div>
              <div className="column is-8">
                <Img
                  fluid={finish.image.childImageSharp.fluid}
                  fadeIn={true}
                  alt={finish.name}
                />
              </div>
            </div>
          ))
        ) : null
      }
    </section>

    {
      gallery && gallery.length ? (
        <section className="section">
          <Gallery title="Experience the difference.">
            {
              gallery.map((
                  item,
                  index
                ) => (
                  <GalleryItem
                    offset={index}
                    key={index}
                    title={item.text}
                    image={item.image}
                  />
                ))
            }
          </Gallery>
        </section>
      ) : null
    }
  </>
)

AccessoryPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  techSpecs: PropTypes.string,
  bannerImage: PropTypes.object,
  finishes: PropTypes.array,
  gallery: PropTypes.array,
}

const AccessoryPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const bannerImage = frontmatter.bannerImage &&
    frontmatter.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <AccessoryPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        techSpecs={frontmatter.techSpecs}
        bannerImage={bannerImage}
        finishes={frontmatter.finishes}
        gallery={frontmatter.gallery}
      />
    </Layout>
  )
}

AccessoryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default AccessoryPage

export const pageQuery = graphql`
  query AccessoryPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        techSpecs
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 1600, maxHeight: 750, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        finishes {
          image {
            childImageSharp {
              fluid(maxWidth: 800, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
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