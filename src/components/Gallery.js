import React from 'react'
import {Parallax} from 'react-spring'
import GalleryItem from '../components/GalleryItem'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  scrollTo = to =>  {
    this.refs.primary.scrollTo(to)
    this.refs.next.scrollTo(to)
    this.refs.prev.scrollTo(to)
    this.setState({
      index: to
    })
  }

  mod = (a, n) => {
    return ((a%n)+n)%n;
  }

  render() {
    const {title, description, children} = this.props
    const {index} = this.state
    const length = (children && children.length) || 0

    return (
      <div className="gallery-container">
        <div className="gallery-description">
          <p className="title has-text-centered has-text-white">
            {title}
          </p>
        </div>
        <div className="gallery-images-container">
          <div className="gallery-main-image">
            <Parallax
              className="parallax-gallery"
              ref="primary"
              pages={length}
              horizontal scrolling={false}
            >
              {React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                  onClick: () => this.scrollTo((index+1) % length)
                })
              })}
            </Parallax>
          </div>
          <div className="gallery-next-image">
            <div className="gallery-overlay"></div>
            <Parallax
              className="parallax-gallery"
              ref="next"
              pages={length}
              horizontal scrolling={false}
            >
              {React.Children.map(children, (child, index) => {
                const props = { ...child.props }
                props.offset = this.mod(props.offset - 1, length)

                return <GalleryItem {...props} />
              })}
            </Parallax>
          </div>
          <div className="gallery-prev-image">
            <div className="gallery-overlay"></div>
            <Parallax
              className="parallax-gallery"
              ref="prev"
              pages={length}
              horizontal scrolling={false}
            >
              {React.Children.map(children, (child, index) => {
                const props = { ...child.props }
                props.offset = this.mod(props.offset + 1, length)

                return <GalleryItem {...props} />
              })}
            </Parallax>
          </div>
        </div>
        <div className="gallery-banner" />

        <div className="columns has-padding-top-medium">
          <div className="column">
            <div>
              <span className="current-slide">
                { (index + 1).toString().padStart(2, '0') }
              </span>
              <span className="total-slides">
                { `/${(length).toString().padStart(2, '0')}` }
              </span>
            </div>
            <div>
              <span className="gallery-icon"
                   onClick={() => this.scrollTo(this.mod(index-1, length))}
              >
                arrow_back
              </span>
              <span className="gallery-icon"
                   onClick={() => this.scrollTo(this.mod(index+1, length))}
              >arrow_forward</span>
            </div>
          </div>
          <div className="column">
            <p className="subtitle is-uppercase">Shown</p>
            <h4 className="title is-4">{children[index].props.title}</h4>
          </div>
          <div className="column">
            <p>{description}</p>
          </div>
          <div className="column"></div>
        </div>
      </div>
    )
  }
}


export default Gallery