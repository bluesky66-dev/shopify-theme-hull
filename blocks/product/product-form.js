import React from 'react'

import { ProductOption } from '@blocks/product'

const ProductForm = ({ product, activeVariant, onVariantChange }) => {
  if (!product) return null

  return (
    <div className="product--options">
      {product.options?.map(
        (option, key) =>
          option.values.length > 1 && (
            <ProductOption
              key={key}
              position={key}
              option={option}
              variants={product.variants}
              activeVariant={activeVariant}
              onChange={onVariantChange}
            />
          )
      )}
    </div>
  )
}

export default ProductForm
