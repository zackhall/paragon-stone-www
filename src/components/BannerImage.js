import React from 'react'
import { Link } from 'gatsby'

const BannerImage = ({ src }) => (
  <div
    className="banner-image-container"
    style={{
      backgroundImage: `url(${src})`
    }}
    />
)

export default BannerImage;