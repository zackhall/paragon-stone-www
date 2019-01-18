import React from 'react'
import PropTypes from 'prop-types'
import { FullWidthPageTemplate } from '../../templates/full-width-page'

const FullWidthPagePreview = ({ entry, widgetFor }) => (
  <FullWidthPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

FullWidthPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default FullWidthPagePreview
