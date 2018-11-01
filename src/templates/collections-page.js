import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import groupBy from 'lodash/groupBy'

import BannerImage from '../components/BannerImage'
import Content, { HTMLContent } from '../components/Content'
import Collection from '../components/Collection'
import Layout from '../components/Layout'

export const CollectionsPageTemplate = ({
  title,
  bannerImage,
  content,
  contentComponent,
  collections,
}) => {
  const PageContent = contentComponent || Content

  return (
    <>
      {
        bannerImage ?
          <BannerImage
            src={bannerImage}
            title={title}
          /> :
          <section className="section">
            <container>
              <h2 className="title is-size-3">
                {title}
              </h2>
            </container>
          </section>
      }
      <section className="section">
        <PageContent className="content" content={content} />
      </section>
      <section className="section">
        {
          Object
            .keys(collections)
            .sort((a, b) => {
              const aUpper = a.toUpperCase(),
                    bUpper = b.toUpperCase()

              if (aUpper === 'NONE') { return 1 }
              if (bUpper === 'NONE') { return -1 }
              if (aUpper > bUpper)   { return 1 }
              if (aUpper < bUpper)   { return -1 }
              return 0
            })
            .map((key) => (
              <Collection title={ key.toUpperCase() !== 'NONE' ? key : 'Other'} products={collections[key]} />
            ))
        }
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
  const products =
    get(data, 'allMarkdownRemark.edges', [])
      .map(product =>
        ({
          slug:  get(product, 'node.fields.slug'),
          name: get(product, 'node.frontmatter.title'),
          image: get(product, 'node.frontmatter.finishes[0].image'),
          categories: get(product, 'node.frontmatter.categories[0]', 'None'),
        })
      )

  const collections = groupBy(products, 'categories')
  console.log('collections')
  console.log(collections)

  return (
    <Layout>
      <CollectionsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        bannerImage={post.frontmatter.bannerImage.childImageSharp.resolutions.src}
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
            resolutions(width: 2048) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "product-page" } }}
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
