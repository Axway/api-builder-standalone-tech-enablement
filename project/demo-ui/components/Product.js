import React from 'react'

const Product = ({ product, showDetails }) => (
  <tr>
    <td>{product.name}</td>
    <td>{product.sku}</td>
    <td>{product.description}</td>
    <td><button className="button button-outline" onClick={showDetails.bind(this, product.sku)}>Find Details</button></td>
  </tr>  
)

export default Product