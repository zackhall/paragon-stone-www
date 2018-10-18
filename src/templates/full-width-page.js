import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

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
            src={bannerImage}
            title={title}
            backgroundPosition='center'
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
    </>
  )
}

FullWidthPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  bannerImage: PropTypes.string,
  contentComponent: PropTypes.func,
}

const FullWidthPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <FullWidthPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        bannerImage={post.frontmatter.bannerImage}
        content={post.html}
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
        bannerImage
      }
    }
  }
`
