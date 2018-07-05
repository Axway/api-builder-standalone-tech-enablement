import React, { PropTypes } from 'react'
import Product from '../components/Product';

export default class Products extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.products.length === 0) {
      return (
        <div>
          No products retrieved yet!
        </div>
      )
    } else {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.products.map((product, i) => (
                  <Product key={i} product={product} showDetails={this.props.showDetails}/>
                ))
              }
            </tbody>
          </table>
        </div>
      )
    }
  }
}