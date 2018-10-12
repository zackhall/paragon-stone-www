import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import BannerImage from '../components/BannerImage'
import Gallery from '../components/Gallery'
import GalleryItem from '../components/GalleryItem'

export const ProductPageTemplate = ({
  title,
  description,
  techSpecs,
  bannerImage,
  finishes,
  gallery,
}) => (
  <>
    <BannerImage
      src={bannerImage}
      title={title}
    />

    <div className="tech-specs-container has-text-white">
      <div className="section has-padding-y-large">
        <div className="columns">
          <div className="column">
            <p className="subtitle has-text-white">
              Meet {title}
            </p>
          </div>
          <div className="column is-6 has-padding-right-small">
            {description}
          </div>
          <div className="column">
            <div className="columns">
              <div className="column is-narrow icon-font">
                transform
              </div>
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
          <h3 className="subtitle">
            Finishes
          </h3>
        </div>
        <div className="column">
          <div className="columns">
            {
              finishes.map((finish, index) => (
                <div className="column is-4">
                  <h3 className="title is-5">
                    {finish.name}
                  </h3>
                  <img src={finish.image} alt=""/>
                </div>
              ))
            }
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

ProductPageTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  techSpecs: PropTypes.string,
  bannerImage: PropTypes.string,
  finishes: PropTypes.array,
  gallery: PropTypes.array,
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ProductPageTemplate
        title={frontmatter.title}
        description={frontmatter.description}
        techSpecs={frontmatter.techSpecs}
        bannerImage={frontmatter.bannerImage}
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
        bannerImage
        finishes {
          image
          name
        }
        gallery {
          image
          text
        }
      }
    }
  }
`