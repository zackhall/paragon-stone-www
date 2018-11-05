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
        {/* <form
          name="contact"
          method="POST"
          action="/"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">From</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Name" />
                </p>
              </div>
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="Email" />
                </p>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field is-expanded">
                <div className="field has-addons">
                  <p className="control">
                    <a className="button is-static">
                      +1
                    </a>
                  </p>
                  <p className="control is-expanded">
                    <input
                      className="input"`1
                      type="tel"
                      name="tel"
                      placeholder="Your phone number (optional)" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">Your Role</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <div className="select">
                    <select name="role">
                      <option value="" disabled selected></option>
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
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Message</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    name="message"
                    placeholder="">
                  </textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label">
              <label className="label">How did you hear about us?</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control is-expanded">
                  <div className="select">
                    <select name="referrer">
                      <option value="" disabled selected></option>
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
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label"></div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button className="button is-link" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form> */}
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