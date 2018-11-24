import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import BannerImage from '../components/BannerImage'
import ContactForm from '../components/ContactForm'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const ContactPageTemplate = ({
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
        {
          !bannerImage ?
            <h2 className="title is-size-3">
              {title}
            </h2> : null
        }
        <PageContent className="content" content={content} />
      </section>

      <div className="section">
        <ContactForm />
      </div>
    </>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  bannerImage: PropTypes.object,
  contentComponent: PropTypes.func,
}

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data
  const bannerImage = post.frontmatter.bannerImage &&
    post.frontmatter.bannerImage.childImageSharp.fluid

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        bannerImage={bannerImage}
        content={post.html}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const ContactPageQuery = graphql`
  query ContactPage($id: String!) {
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