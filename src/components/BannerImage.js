import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const BannerImage = ({
  img,
  title,
  backgroundPosition,
}) => (
  <div className="banner-image-container">
    <div className="banner-image-content">
      <div className="section">
        <h1 className="title is-1 has-text-white">
          {title}
        </h1>
      </div>
    </div>
    <Img
      fluid={img}
      fadeIn={true}
      alt={title}
      className="banner-image-bg"
     />
  </div>
)

export default BannerImage;