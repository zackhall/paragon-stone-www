import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import BannerImage from '../components/BannerImage'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export const BrochurePageTemplate = ({
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

      <section className="section">
        <h2 className="title is-2">
          Download your brochure now.
        </h2>
        <form
          name="download-brochure"
          method="POST"
          action="/brochure/thanks"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="download-brochure" />
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">E-mail</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input className="input" type="email" name="email" placeholder="e.g. thestoneguys@example.com" />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-link" type="submit">Download</button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>


      <div className="section">
        <h2 className="title is-2">
          Or, get your physical brochure in the mail.
        </h2>
        <form
          name="request-brochure"
          method="POST"
          action="/brochure/thanks"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="request-brochure" />
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
                      className="input"
                      type="tel"
                      name="tel"
                      placeholder="Your phone number" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Address</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="streetAddress1"
                    placeholder="Street address" />
                </p>
              </div>
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="streetAddress2"
                    placeholder="Apt/Unit/Box #" />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label"></label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control is-expanded">
                  <input
                    className="input"
                    type="text"
                    name="city"
                    placeholder="City" />
                </p>
              </div>
              <div className="field">
                <p className="control ">
                  <input
                    className="input"
                    type="text"
                    name="state"
                    placeholder="State" />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    type="text"
                    name="zipCode"
                    placeholder="Zip code" />
                </p>
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Question</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    name="comments"
                    placeholder="Any additional questions?">
                  </textarea>
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
                    Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
        bannerImage={post.frontmatter.bannerImage.childImageSharp.resolutions.src}
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