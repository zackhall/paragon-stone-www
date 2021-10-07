import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import BannerImage from '../components/BannerImage'
import Gallery from '../components/Gallery'
import GalleryItem from '../components/GalleryItem'

const ProductPageTemplate = ({
  title,
  description,
  techSpecs,
  bannerImage,
  finishes,
  gallery,
}) => (
  <>
    <Helmet
      title={`${title} | Products | Paragon Stone Architectural Stone Veneers`}
    />

    <BannerImage img={bannerImage} title={title} />

    <div className="tech-specs-container has-text-white">
      <div className="section has-padding-y-large">
        <div className="columns">
          <div className="column">
            <p className="subtitle has-text-white">Meet {title}</p>
          </div>
          <div className="column is-6 has-padding-right-small">
            {description}
          </div>
          <div className="column">
            <div className="columns">
              <div className="column is-narrow icon-font">transform</div>
              <div className="column">
                <p>{techSpecs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section className="section has-padding-y-large">
      <div className="columns">
        <div className="column is-3">
          <h3 className="subtitle">Finishes</h3>
        </div>
        <div className="column">
          <div className="columns">
            {finishes && finishes.length
              ? finishes.map((finish, index) => (
                  <div className="column is-4 has-margin-bottom-medium">
                    <h3 className="title is-5">{finish.name}</h3>
                    <Img
                      fluid={finish.image.childImageSharp.fluid}
                      fadeIn={true}
                      alt={finish.name}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </section>

    {gallery && gallery.length ? (
      <section className="section">
        <Gallery title="Experience the difference.">
          {gallery.map((item, index) => (
            <GalleryItem
              offset={index}
              key={index}
              title={item.text}
              image={item.image}
            />
          ))}
        </Gallery>
      </section>
    ) : null}
  </>
)

ProductPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  techSpecs: PropTypes.string,
  bannerImage: PropTypes.object,
  finishes: PropTypes.array,
  gallery: PropTypes.array,
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const bannerImage =
    frontmatter.bannerImage && frontmatter.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <ProductPageTemplate
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

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const pageQuery = graphql`
  query ProductPageById($id: String!) {
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
