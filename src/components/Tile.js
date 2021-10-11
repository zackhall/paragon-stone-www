import React from 'react'

const Tile = ({
  size,
  number,
  title,
  subtitle,
  bgSrc,
  bgSize,
  bgPosition,
  isInverted,
}) => (
  <div
    className={`
      tile
      ${size === 4 ? 'tile--height-2' : 'tile--height-1'}
      ${isInverted && 'has-text-white'}
    `}
    style={{
      backgroundImage: bgSrc ? `url(${bgSrc})` : 'none',
      backgroundSize: bgSize || 'cover',
      backgroundPosition: bgPosition || 'center',
    }}
  >
    <div className="top">
      <p
        className={`
        subtitle is-3
        ${isInverted && 'has-text-white'}
      `}
      >
        {number}
      </p>
    </div>
    <div className="bottom">
      <p
        className={`
        title
        ${size === 1 && 'title is-5 is-size-3-mobile'}
        ${isInverted && 'has-text-white'}
      `}
      >
        {title}
      </p>
      {subtitle && <p>{subtitle}</p>}
    </div>
  </div>
)

export default Tile
