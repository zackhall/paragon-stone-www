import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const TwoColumnPageTemplate = ({
  title,
  bannerImage,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <Helmet title={`${title} | Paragon Stone Architectural Stone Veneers`} />
      <section className="section has-padding-bottom-small">
        <h1 className="title is-size-1 has-text-centered">{title}</h1>
      </section>

      <section className="section">
        <container>
          <div className="columns">
            <div className="column is-two-fifths">
              <Img fluid={bannerImage} fadeIn={true} />
            </div>
            <div className="column is-three-fifths has-padding-left-medium">
              <PageContent className="content" content={content} />
            </div>
          </div>
        </container>
      </section>
    </>
  )
}

TwoColumnPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  bannerImage: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const TwoColumnPage = ({ data }) => {
  const { markdownRemark: post } = data
  const bannerImage =
    post.frontmatter.bannerImage &&
    post.frontmatter.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <TwoColumnPageTemplate
        title={post.frontmatter.title}
        bannerImage={bannerImage}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

TwoColumnPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default TwoColumnPage

export const twoColumnPageQuery = graphql`
  query TwoColumnPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        bannerImage {
          childImageSharp {
            fluid(maxWidth: 650, maxHeight: 800, quality: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
