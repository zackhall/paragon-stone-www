import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import BannerImage from '../components/BannerImage'
import Gallery from '../components/Gallery'
import GalleryItem from '../components/GalleryItem'

const AccessoryPageTemplate = ({
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

    {bannerImage ? <BannerImage img={bannerImage} title={title} /> : null}

    <section className="section">
      <container>
        {!bannerImage ? <h2 className="title is-size-3">{title}</h2> : null}
      </container>
    </section>

    <section className="section has-padding-y-large">
      {finishes && finishes.length
        ? finishes.map((finish, index) => (
            <div className="columns has-margin-bottom-large">
              <div className="column is-3">
                <div className="subtitle">{finish.name}</div>
              </div>
              <div className="column is-9">
                <img src={finish.image.publicURL} alt={finish.name} />
                <div>
                  <small
                    dangerouslySetInnerHTML={{
                      __html:
                        finish.caption &&
                        finish.caption.replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        : null}
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
  const bannerImage =
    frontmatter.bannerImage && frontmatter.bannerImage.childImageSharp.fluid

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
            publicURL
            childImageSharp {
              fixed(width: 800, quality: 75) {
                # ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFixed
              }
            }
          }
          name
          caption
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
