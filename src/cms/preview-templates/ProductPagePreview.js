import React from 'react'
import PropTypes from 'prop-types'
import { ProductPageTemplate } from '../../templates/product-page'

const ProductPagePreview = ({ entry }) => {
  const entryFinishes = entry.getIn(['data', 'finishes'])
  const finishes = entryFinishes ? entryFinishes.toJS() : []

  const entryGallery = entry.getIn(['data', 'gallery'])
  const gallery = entryGallery ? entryGallery.toJS() : []

  return (
    <ProductPageTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      techSpecs={entry.getIn(['data', 'techSpecs'])}
      bannerImage={entry.getIn(['data', 'bannerImage'])}
      finishes={finishes}
      gallery={gallery}
    />
  )
}

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  })
}

export default ProductPagePreview
