import React from 'react'
import {Parallax} from 'react-spring'

const GalleryItem = ({offset, src, onClick}) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0} onClick={onClick} >
      <div style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        height: '100%',
        width: '100%'
      }} />
    </Parallax.Layer>
  </React.Fragment>
)

export default GalleryItem