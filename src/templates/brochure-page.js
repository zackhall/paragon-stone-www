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
          action="/"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="download-brochure" />
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">E-mail</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input class="input" type="email" name="email" placeholder="e.g. thestoneguys@example.com" />
                </p>
              </div>
              <div class="field">
                <p class="control">
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
          action="/"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="request-brochure" />
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">From</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    name="name"
                    placeholder="Name" />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="email"
                    name="email"
                    placeholder="Email" />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="field has-addons">
                  <p class="control">
                    <a class="button is-static">
                      +1
                    </a>
                  </p>
                  <p class="control is-expanded">
                    <input
                      class="input"
                      type="tel"
                      name="tel"
                      placeholder="Your phone number" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Address</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    name="streetAddress1"
                    placeholder="Street address" />
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    name="streetAddress2"
                    placeholder="Apt/Unit/Box #" />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label"></label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="text"
                    name="city"
                    placeholder="City" />
                </p>
              </div>
              <div class="field">
                <p class="control ">
                  <input
                    class="input"
                    type="text"
                    name="state"
                    placeholder="State" />
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    name="zipCode"
                    placeholder="Zip code" />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Question</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea
                    class="textarea"
                    name="comments"
                    placeholder="Any additional questions?">
                  </textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
              <div class="field">
                <div class="control">
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