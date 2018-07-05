import React from 'react'

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (!this.props.productDetails) {
      return (
        <div>
          No product selected yet! 
          Please select a product from the list with products above.
        </div>
      )
    } else {
      return (
        <div>
        SKU <p style={{ fontWeight: 'bold' }}>{this.props.productDetails.sku}</p>
        Name <p style={{ fontWeight: 'bold' }}>{this.props.productDetails.name}</p>
        Description <p style={{ fontWeight: 'bold' }}>{this.props.productDetails.description}</p>
        <br />
        <h3>Reviews</h3>
        <table>
          <thead>
            <tr>
              <th>Nick</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.productDetails.reviews.map((item, i) => (
                <tr key={i}>
                  <td>{item.user}</td>
                  <td>{item.review}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <br />
        <h3>Taxonomy</h3>
        <table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.productDetails.taxonomy.map((item, i) => (
                <tr key={i}>
                  <td>{item.tag}</td>
                  <td>{item.confidence_score}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      )
    }
  }
}