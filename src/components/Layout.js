import React from 'react'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import Navigation from '../components/Navigation'
import PreFooter from '../components/PreFooter'
import './all.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Home | Paragon Stone" />
    <Navigation />
    <div>{children}</div>
    <PreFooter />
  </div>
)

export default TemplateWrapper
