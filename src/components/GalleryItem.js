import React from 'react'
import PropTypes from 'prop-types'
import { Parallax } from 'react-spring'
import Img from 'gatsby-image'

const GalleryItem = ({ title, offset, image, onClick }) => (
  <>
    <Parallax.Layer offset={offset} speed={0} onClick={onClick}>
      <Img
        fluid={image.childImageSharp.fluid}
        fadeIn={true}
        alt={title}
        style={{
          height: '100%',
        }}
      />
    </Parallax.Layer>
  </>
)

GalleryItem.propTypes = {
  title: PropTypes.string,
  offset: PropTypes.number,
  image: PropTypes.object,
  onClick: PropTypes.function,
}

export default GalleryItem
