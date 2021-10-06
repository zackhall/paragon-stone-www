import CMS from 'netlify-cms-app'

import FullWidthPagePreview from './preview-templates/FullWidthPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
// import ProductPagePreview from './preview-templates/ProductPagePreview'

CMS.registerPreviewTemplate('about', FullWidthPagePreview)
// CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
