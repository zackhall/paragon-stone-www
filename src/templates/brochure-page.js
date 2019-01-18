import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import BannerImage from '../components/BannerImage'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import BrochureDownloadForm from '../components/BrochureDownloadForm'
import BrochureRequestForm from '../components/BrochureRequestForm'

export const BrochurePageTemplate = ({
  title,
  bannerImage,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <Helmet title={`${title} | Paragon Stone Architectural Stone Veneers`} />
      {
        bannerImage ?
          <BannerImage
            img={bannerImage}
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

      <section className="section">
        <h2 className="title is-2">
          Download your brochure now.
        </h2>
        <BrochureDownloadForm />
      </section>


      <div className="section">
        <h2 className="title is-2">
          Or, get your physical brochure in the mail.
        </h2>
        <BrochureRequestForm />
      </div>
    </>
  )
}

BrochurePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  bannerImage: PropTypes.object,
  contentComponent: PropTypes.func,
}

const BrochurePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BrochurePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        bannerImage={post.frontmatter.bannerImage.childImageSharp.fluid}
        content={post.html}
      />
    </Layout>
  )
}

BrochurePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default BrochurePage

export const BrochurePageQuery = graphql`
  query BrochurePage($id: String!) {
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