import React from 'react'
import Helmet from 'react-helmet'

import Navigation from '../components/Navigation'
import PreFooter from '../components/PreFooter'
import Footer from '../components/Footer'
import './all.scss'
import favicon from '../img/favicon.ico'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Paragon Stone Architectural Stone Veneers"
      link={[
          { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }
      ]}
    />
    <Navigation />
    <div>{children}</div>
    <PreFooter />
    <Footer />
  </div>
)

export default TemplateWrapper
