import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import flatten from 'lodash/flatten'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'
import Helmet from 'react-helmet'

import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import { Select, SelectItem } from '../components/Select'

const GalleryPageTemplate = ({ title, images, content, contentComponent }) => {
  const [galleryImages, setGalleryImages] = useState([])
  const [currentImage, setCurrentImage] = useState(0)
  const [isLightboxOpen, setIsLightBoxOpen] = useState(false)

  const [stones, setStones] = useState([])
  const [stoneFilter, setStoneFilter] = useState('')
  useEffect(
    () => {
      setStones(
        uniq(flatten(images.map((i) => i.stones))).filter((stone) => !!stone)
      )
    },
    [images]
  )

  const [colors, setColors] = useState([])
  const [colorFilter, setColorFilter] = useState('')
  useEffect(
    () => {
      setColors(
        uniq(flatten(images.map((i) => i.colors))).filter((color) => !!color)
      )
    },
    [images]
  )

  function clearFilters() {
    setStoneFilter('')
    setColorFilter('')
  }

  function openLightbox(event, obj) {
    setCurrentImage(obj.index)
    setIsLightBoxOpen(true)
  }
  function closeLightbox() {
    setIsLightBoxOpen(false)
  }
  function gotoPrevious() {
    setCurrentImage(currentImage - 1)
  }
  function gotoNext() {
    setCurrentImage(currentImage + 1)
  }

  useEffect(
    () => {
      setGalleryImages(
        images
          .filter(
            // if there is a stone filter, check that it matches
            (i) => !stoneFilter || (i.stones && i.stones.includes(stoneFilter))
          )
          .filter(
            // if there is a color filter, check that it matches
            (i) => !colorFilter || (i.colors && i.colors.includes(colorFilter))
          )
          .map((i, index) => ({
            ...get(i, 'image.childImageSharp.fixed'),
            caption: i.text,
            stones: i.stones,
            colors: i.colors,
          }))
      )
    },
    [images, stoneFilter, colorFilter]
  )

  const PageContent = contentComponent || Content

  return (
    <>
      <Helmet title={`${title} | Paragon Stone Architectural Stone Veneers`} />
      <section className="section has-padding-y-large">
        <h2 className="title is-size-2">{title}</h2>

        <PageContent className="content" content={content} />

        <div className="block">
          <div className="is-inline-block mr-4">
            <span className="icon-font valign-sub">filter_list</span>
            <span className="is-size-5">&nbsp;Filters</span>
          </div>
          <div className="is-inline-block-tablet is-block-mobile">
            <select
              className="mr-2 my-2"
              onChange={(event) => setStoneFilter(event.target.value)}
              value={stoneFilter}
            >
              <option value="">Stone type</option>
              <option value="">None</option>
              {stones.map((stone) => (
                <option value={stone}>{stone}</option>
              ))}
            </select>

            <select
              className="mr-2 my-2"
              onChange={(event) => setColorFilter(event.target.value)}
              value={colorFilter}
            >
              <option value="">Stone color</option>
              <option value="">None</option>
              {colors.map((color) => (
                <option value={color}>{color}</option>
              ))}
            </select>
          </div>

          {(!!stoneFilter || !!colorFilter) && (
            <button className="button is-ghost my-2" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        {!!galleryImages.length ? (
          <>
            <Gallery
              photos={galleryImages}
              direction={'column'}
              onClick={openLightbox}
            />
            <Lightbox
              images={galleryImages}
              onClose={closeLightbox}
              onClickPrev={gotoPrevious}
              onClickNext={gotoNext}
              currentImage={currentImage}
              isOpen={isLightboxOpen}
              backdropClosesModal={true}
            />
          </>
        ) : (
          <div className="block my-extra-large has-text-centered">
            <h4 className="is-size-4 has-text-centered">
              Sorry, no images match the current filter.
            </h4>
            <div className="block">
              <button className="button is-ghost" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  )
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
          colors
          stones
        }
      }
    }
  }
`
