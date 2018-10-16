import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import get from 'lodash/get'

export const CollectionsPageTemplate = ({ title, content, contentComponent, products }) => {
  const PageContent = contentComponent || Content
  console.log(products)

  return (
    <>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          {
            products && products.length ? (
              products.map((product, index) => (
                <div className="column is-3 has-margin-bottom-medium"
                     key={product.slug}
                >
                  <h3 className="title is-5">
                    <Link to={product.slug}>
                      {product.title}
                    </Link>
                  </h3>
                  <Link to={product.slug}>
                    <img src={product.image} alt=""/>
                  </Link>
                </div>
              ))
            ) : null
          }
        </div>
      </section>
    </>
  )
}

CollectionsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  products: PropTypes.array,
}

const CollectionsPage = ({ data }) => {
  const { markdownRemark: post } = data
  const products =
    get(data, 'allMarkdownRemark.edges', [])
      .map(product =>
        ({
          slug:  get(product, 'node.fields.slug'),
          title: get(product, 'node.frontmatter.title'),
          image: get(product, 'node.frontmatter.finishes[0].image'),
        })
      )

  return (
    <Layout>
      <CollectionsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        products={products}
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
            finishes {
              image
            }
          }
        }
      }
    }
  }
`
