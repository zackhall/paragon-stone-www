import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import BannerImage from '../components/BannerImage'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const FullWidthPageTemplate = ({
  title,
  bannerImage,
  attachment,
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
          {
            !!attachment ?
              <article className="message is-primary">
                <div className="message-body">
                  <p>
                    {attachment.text}
                  </p>
                  <p>
                    <Link to={attachment.file}>
                      Download Now
                    </Link>
                  </p>
                </div>
              </article> : null
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
  attachment: PropTypes.object,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const FullWidthPage = ({ data }) => {
  const { markdownRemark: post } = data
  const bannerImage = post.frontmatter.bannerImage &&
    post.frontmatter.bannerImage.childImageSharp.resolutions.src
  const attachment = post.frontmatter.attachment

  return (
    <Layout>
      <FullWidthPageTemplate
        title={post.frontmatter.title}
        bannerImage={bannerImage}
        attachment={attachment}
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
            resolutions(width: 2048) {
              width
              height
              src
              srcSet
            }
          }
        }
        attachment {
          file
          text
        }
      }
    }
  }
`
