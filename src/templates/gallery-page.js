import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import Helmet from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

class GalleryPageTemplate extends React.Component {
  constructor() {
    super()
    this.state = { currentImage: 0 }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  render() {
    const { title, images, content, contentComponent } = this.props

    const galleryImages = images.map((i, index) => ({
      ...get(i, 'image.childImageSharp.fixed'),
      caption: i.text,
    }))

    const PageContent = contentComponent || Content

    return (
      <>
        <Helmet
          title={`${title} | Paragon Stone Architectural Stone Veneers`}
        />
        <section className="section has-padding-y-large">
          <h2 className="title is-size-2">{title}</h2>

          <PageContent className="content" content={content} />

          <Gallery
            photos={galleryImages}
            direction={'column'}
            onClick={this.openLightbox}
          />
          <Lightbox
            images={galleryImages}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            backdropClosesModal={true}
          />
        </section>
      </>
    )
  }
}

GalleryPageTemplate.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      text: PropTypes.string,
    })
  ),
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
}

const GalleryPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <GalleryPageTemplate
        title={frontmatter.title}
        images={frontmatter.images}
        content={html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

GalleryPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default GalleryPage

export const pageQuery = graphql`
  query GalleryPageById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        images {
          image {
            childImageSharp {
              fixed(width: 1024) {
                width
                height
                src
                srcSet
              }
            }
          }
          text
        }
      }
    }
  }
`
