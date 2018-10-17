import React from 'react'
import { Link } from 'gatsby'

const Collection = ({ title, products }) => (
  products && products.length ?
    <div className="columns">
      <div className="column is-3">
        <h3 className="subtitle">
          {title}
        </h3>
      </div>
      <div className="column">
        <div className="columns">
          {
            products.map((product, index) => (
              <div className="column is-4 has-margin-bottom-medium">
                {
                  product.slug ?
                    <Link to={product.slug}>
                      <h3 className="title is-5">
                        {product.name}
                      </h3>
                    </Link> :
                    <h3 className="title is-5">
                      {product.name}
                    </h3>
                }
                {
                  product.slug ?
                    <Link to={product.slug}>
                      <img src={product.image} alt={product.name} />
                    </Link> :
                    <img src={product.image} alt={product.name} />
                }

              </div>
            ))
          }
        </div>
      </div>
    </div>
  : null
)

export default Collection