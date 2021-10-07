import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'
import Helmet from 'react-helmet'

import BannerImage from '../components/BannerImage'
import Content, { HTMLContent } from '../components/Content'
import Collection from '../components/Collection'
import Layout from '../components/Layout'

const CollectionsPageTemplate = ({
  title,
  bannerImage,
  content,
  contentComponent,
  collections,
}) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <Helmet title={`${title} | Paragon Stone Architectural Stone Veneers`} />
      {bannerImage ? (
        <BannerImage img={bannerImage} title={title} />
      ) : (
        <section className="section">
          <container>
            <h2 className="title is-size-3">{title}</h2>
          </container>
        </section>
      )}
      <section className="section">
        <PageContent className="content" content={content} />
      </section>
      <section className="section">
        {Object.keys(collections)
          .sort((a, b) => {
            const aUpper = a.toUpperCase(),
              bUpper = b.toUpperCase()

            if (aUpper === 'NONE' || aUpper === 'OTHER') {
              return 1
            }
            if (bUpper === 'NONE' || bUpper === 'OTHER') {
              return -1
            }
            if (aUpper > bUpper) {
              return 1
            }
            if (aUpper < bUpper) {
              return -1
            }
            return 0
          })
          .map((key) => (
            <Collection
              title={key.toUpperCase() !== 'NONE' ? key : 'Other'}
              products={collections[key]}
            />
          ))}
      </section>
    </>
  )
}

CollectionsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  bannerImage: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  collections: PropTypes.object,
}

const CollectionsPage = ({ data }) => {
  const { markdownRemark: post } = data
  const products = get(data, 'allMarkdownRemark.edges', []).map((product) => ({
    slug: get(product, 'node.fields.slug'),
    name: get(product, 'node.frontmatter.title'),
    image: get(product, 'node.frontmatter.finishes[0].image'),
    categories: get(product, 'node.frontmatter.categories[0]', 'None'),
  }))

  const collections = groupBy(products, 'categories')
  return (
    <Layout>
      <CollectionsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        bannerImage={post.frontmatter.bannerImage.childImageSharp.fluid}
        content={post.html}
        collections={collections}
      />
    </Layout>
  )
}

CollectionsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default CollectionsPage

export const collectionsPageQuery = graphql`
  query CollectionsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 1600, maxHeight: 750, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { in: ["product-page", "accessory-page"] } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            categories
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
          }
        }
      }
    }
  }
`
