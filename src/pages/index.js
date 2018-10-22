import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/Layout'
import { HomePageTemplate } from '../templates/home-page'

const IndexPage = ({data}) => {
  console.log(data)
  const homepage = get(data, 'allMarkdownRemark.edges[0].node.frontmatter')
  const {title, gallery} = homepage

  return (
    <Layout>
      <HomePageTemplate
        title={title}
        gallery={gallery}
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
      filter: { frontmatter: { templateKey: { eq: "home-page" } }}
    ) {
      edges {
        node {
          frontmatter {
            title
            gallery {
              text
              image {
                childImageSharp {
                  resolutions(width: 400) {
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
