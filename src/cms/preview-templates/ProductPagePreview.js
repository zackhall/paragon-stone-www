import React from 'react'
import PropTypes from 'prop-types'
import { ProductPageTemplate } from '../../templates/product-page'

const ProductPagePreview = ({ entry, getAsset }) => {
  const entryFinishes = entry.getIn(['data', 'finishes'])
  const finishes = entryFinishes ? entryFinishes.toJS() : []

  const entryGallery = entry.getIn(['data', 'gallery'])
  const gallery = entryGallery ? entryGallery.toJS() : []

  return (
    <ProductPageTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      bannerImage={entry.getIn(['data', 'bannerImage'])}
      heading={entry.getIn(['data', 'heading'])}
      finishes={finishes}
      gallery={gallery}
    />
  )
}

ProductPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProductPagePreview
