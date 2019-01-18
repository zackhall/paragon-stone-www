import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

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
      <Helmet title={`${title} | Paragon Stone Architectural Stone Veneers`} />
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
            <h1 className="title is-size-1">
              {title}
            </h1> : null
        }
        <PageContent className="content" content={content} />
      </section>

      <div className="section">
        <div className="columns">
          <div className="column is-two-thirds has-padding-right-large has-padding-bottom-large">
            <h3 className="title is-3 has-margin-bottom-small">
              Message us —
            </h3>
            <p className="has-padding-bottom-medium">We're happy to help with your project, your business, or finding the nearest dealer. Get in touch with us using the form below or by reaching out directly through phone or e-mail.</p>
            <ContactForm />
          </div>
          <div className="column is-one-third">
            <h3 className="title is-3">
              Office information —
            </h3>
            <p>445 South Crown Hill<br/>Orrville, OH 44647</p>
            <p className="has-padding-top-small">
              <b>Phone:</b> (330) 930-0415<br/>
              <b>Fax:</b> (330) 930-0416<br/>
              <b>E-mail:</b> info@paragonstone.com
            </p>
          </div>
        </div>
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