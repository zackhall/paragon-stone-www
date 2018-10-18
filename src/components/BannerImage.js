import React from 'react'
import { Link } from 'gatsby'

const BannerImage = ({
  src,
  title,
  backgroundPosition,
}) => (
  <div
    className="banner-image-container"
    style={{
      backgroundImage: `url(${src})`,
      backgroundPosition: backgroundPosition || 'bottom'
    }}
  >
    <div className="section">
      <h1 className="title is-1 has-text-white">
        {title}
      </h1>
    </div>
  </div>
)

export default BannerImage;