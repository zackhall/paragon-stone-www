import React from 'react'
import {Parallax} from 'react-spring'
import GalleryItem from '../components/GalleryItem'

class Gallery extends React.Component {
  scrollTo = to =>  {
    this.refs.primary.scrollTo(to)
    this.refs.next.scrollTo(to)
    this.refs.prev.scrollTo(to)
  }

  render() {
    return (
      <div className="gallery-container">
        <div className="gallery-description">
          <p className="title has-text-centered has-text-white">
            {this.props.title}
          </p>
        </div>
        <div className="gallery-images-container">
          <div className="gallery-main-image">
            <Parallax
              className="parallax-gallery"
              ref="primary"
              pages={3}
              horizontal scrolling={false}
            >
              {React.Children.map(this.props.children, (child, index) => {
                return React.cloneElement(child, {
                  onClick: () => this.scrollTo((index+1) % this.props.children.length)
                })
              })}
            </Parallax>
          </div>
          <div className="gallery-next-image">
            <div className="gallery-overlay"></div>
            <Parallax
              className="parallax-gallery"
              ref="next"
              pages={3}
              horizontal scrolling={false}
            >
              {React.Children.map(this.props.children, (child, index) => {
                const props = { ...child.props }
                props.offset = props.offset === 0 ?
                                this.props.children.length -1 :
                                (props.offset - 1) % this.props.children.length

                return <GalleryItem {...props} />
              })}
            </Parallax>
          </div>
          <div className="gallery-prev-image">
            <div className="gallery-overlay"></div>
            <Parallax
              className="parallax-gallery"
              ref="prev"
              pages={3}
              horizontal scrolling={false}
            >
              {React.Children.map(this.props.children, (child, index) => {
                const props = { ...child.props }
                props.offset = (props.offset + 1) % this.props.children.length

                return <GalleryItem {...props} />
              })}
            </Parallax>
          </div>
        </div>
        <div className="gallery-banner"></div>
      </div>
    )
  }
}


export default Gallery