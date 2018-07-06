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
          <div className="row">
            <div className="column"><h3>Main</h3></div>
          </div>
          <div className="row">
            <div className="column"><h6><p style={{ paddingLeft: '5px', backgroundColor: '#FFC107', fontWeight: 'bold', color: 'white' }}>Aggregated Data from Product Service (MySQL)</p></h6></div>
          </div>          
          <div className="row">
            <div className="column">SKU <p style={{ fontWeight: 'bold' }}>{this.props.productDetails.sku}</p></div>
            <div className="column">Name <p style={{ fontWeight: 'bold' }}>{this.props.productDetails.name}</p></div>
            <div className="column">Description <p style={{ fontWeight: 'bold' }}>{this.props.productDetails.description}</p></div>            
          </div>        
        <div className="row">
          <h3>Reviews</h3>
        </div>
        <div className="row">
          <div className="column"><h6><p style={{ paddingLeft: '5px', backgroundColor: '#CDDC39', fontWeight: 'bold', color: 'white' }}>Aggregated Data from Review Service (MongoDB)</p></h6></div>
        </div>        
        <div className="row">
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
        </div>
        <div className="row">
          <h3>Taxonomy</h3>
        </div>
        <div className="row">
          <div className="column"><h6><p style={{ paddingLeft: '5px', backgroundColor: '#00BFA5', fontWeight: 'bold', color: 'white' }}>Aggregated Data from Third Party API</p></h6></div>
        </div>        
        <div className="row">
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
      </div>
      )
    }
  }
}