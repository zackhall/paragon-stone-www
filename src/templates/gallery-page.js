import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'

export class GalleryPageTemplate extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    const {
      title,
      images,
      content,
      contentComponent,
    } = this.props

    const galleryImages = images.map((i, index) => ({
      src: get(i, 'image.childImageSharp.resolutions.src'),
      height: get(i, 'image.childImageSharp.resolutions.height'),
      width: get(i, 'image.childImageSharp.resolutions.width'),
      text: i.text,
    }))

    console.log(galleryImages)

    return(
      <>
        <section className="section has-padding-y-large">
          <Gallery
            photos={galleryImages}
            direction={"column"}
            onClick={this.openLightbox}
          />
          <Lightbox images={galleryImages}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
        </section>
      </>
    )
  }
}

// export const GalleryPageTemplate = ({
//   title,
//   images,
//   content,
//   contentComponent,
// }) => {
//   const galleryImages = images.map((i, index) => ({
//     src: get(i, 'image.childImageSharp.resolutions.src'),
//     height: get(i, 'image.childImageSharp.resolutions.height'),
//     width: get(i, 'image.childImageSharp.resolutions.width'),
//     text: i.text,
//   }))
//   return(
//     <>
//       <section className="section has-padding-y-large">
//         <div className="columns">
//           <div className="column is-3">
//             <h3 className="subtitle">
//               Images
//             </h3>
//           </div>
//           <div className="column">
//             <div className="columns">
//               {
//                 galleryImages && galleryImages.length ? (
//                   galleryImages.map((image, index) => (
//                     <div className="column is-4 has-margin-bottom-medium">
//                       <h3 className="title is-5">
//                         {image.text + image.height + image.width}
//                       </h3>
//                       <img src={image.src} alt=""/>
//                     </div>
//                   ))
//                 ) : null
//               }
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

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
              resolutions(width: 800) {
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