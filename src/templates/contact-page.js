import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import BannerImage from '../components/BannerImage'
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

      <div className="section">
        <form
          name="contact"
          method="POST"
          action="/"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input type="text" name="email" className="input"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input type="email" name="email" className="input"/>
            </div>
          </div>
          <div className="field">
            <label className="label">Your Role:</label>
            <div className="control">
              <div className="select">
                <select name="role">
                  <option value="architect">Architect</option>
                  <option value="builder">Builder</option>
                  <option value="designer">Designer</option>
                  <option value="remodeler">Remodeler</option>
                  <option value="subcontractor">Sub-contractor</option>
                  <option value="homeowner">Homeowner</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Message: </label>
            <div className="control">
              <textarea name="message" className="textarea"></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">Send</button>
            </div>
          </div>
        </form>
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

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        bannerImage={post.frontmatter.bannerImage.childImageSharp.resolutions.src}
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
  }
`