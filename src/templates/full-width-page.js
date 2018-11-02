import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import BannerImage from '../components/BannerImage'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const FullWidthPageTemplate = ({
  title,
  bannerImage,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <>
      {
        bannerImage ?
            <BannerImage
              img={bannerImage}
              title={title}
              backgroundPosition='center'
            /> : null
      }

      <section className="section">
        <container>
          {
            !bannerImage ?
              <h2 className="title is-size-3">
                {title}
              </h2> : null
          }
          <PageContent className="content" content={content} />
        </container>
      </section>
    </>
  )
}

FullWidthPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  bannerImage: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const FullWidthPage = ({ data }) => {
  const { markdownRemark: post } = data
  const bannerImage = post.frontmatter.bannerImage &&
    post.frontmatter.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <FullWidthPageTemplate
        title={post.frontmatter.title}
        bannerImage={bannerImage}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

FullWidthPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default FullWidthPage

export const fullWidthPageQuery = graphql`
  query FullWidthPage($id: String!) {
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
  }
`
