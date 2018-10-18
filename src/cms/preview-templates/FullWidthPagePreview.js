import React from 'react'
import PropTypes from 'prop-types'
import { FullWidthPageTemplate } from '../../templates/about-page'

const FullWidthPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
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
