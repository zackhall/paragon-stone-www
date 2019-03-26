import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/Layout'
import { HomePageTemplate } from '../templates/home-page'

const IndexPage = ({ data }) => {
  const homepage = get(data, 'allMarkdownRemark.edges[0].node.frontmatter')
  const { title, gallery } = homepage
  const bannerImage =
    homepage.bannerImage && homepage.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <HomePageTemplate
        title={title}
        gallery={gallery}
        bannerImage={bannerImage}
      />
    </Layout>
  )
}

export default IndexPage

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
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      edges {
        node {
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
                  fluid(maxWidth: 800, quality: 75) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              text
            }
          }
        }
      }
    }
  }
`
