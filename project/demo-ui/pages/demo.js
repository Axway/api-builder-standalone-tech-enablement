import Head from '../components/Head';
import Menu from '../components/Menu';
import Products from '../components/Products';
import ProductDetails from '../components/ProductDetails';
const ReactMarkdown = require('react-markdown');
const PageContent = require('../blog/demo');
import requester from '../integration/axios'
const requesterAPI = requester()

export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productDetails: null,
      apiKey: "",
      serviceLocation: null,
      usingMockData: true
    }
  }

  setAPIKey = (e) => {
    const newValue = e.target.value
    this.setState({
      apiKey: newValue
    })
  }
  
  setServiceLocation = (e) => {
    const serviceLocation = e.target.value
    if (serviceLocation === "") {
      serviceLocation = null
    }
    this.setState({
      serviceLocation: serviceLocation
    })
  }

  getProducts = async (e) => {
    let products = await requesterAPI.get(`products`, this.state.apiKey, this.state.serviceLocation)
    let usingMockData
    if (!products || products.length === 0) {
      //fallback to mock data
      console.log('Working with Mock products data!')
      products = require('../datasource/mock/products')
      usingMockData = true
    } else {
      usingMockData = false
    }
    this.setState({
      products: products,
      productDetails: null,
      usingMockData: usingMockData
    })    
  }

  showProductDetails = async (sku, event) => {
    let productDetails
    if (this.state.usingMockData) {
      //fallback to mock data
      console.log('Working with Mock product details data!')
      productDetails = require('../datasource/mock/productDetails')[sku]
    } else {
      productDetails = await requesterAPI.get(`productinfo/${sku}`, this.state.apiKey, this.state.serviceLocation)
      if (!productDetails) {
        //fallback to mock data
        console.log('Working with Mock product details data!')
        productDetails = require('../datasource/mock/productDetails')[0]  
      }
    }
    this.setState({
      productDetails: productDetails
    })    
  }

  render() {
    let message;

    if (this.state.usingMockData) {
      message = <div className="row"><div className="column"><p style={{ color: 'red' }}>Please specify correct location and API Key to get real data from a service! Until then mock data will be loaded for products.</p></div></div>
    } else {
      message = <div className="row"><div className="column"><p style={{ color: 'green' }}>Working with real data obtained from three datasources via aggregations service!</p></div></div>
    }

    return (
      <div className="container">
        <Head />
        <div className="row">
          <div className="column"><Menu /></div>
        </div>
        <div className="row">
          <div className="column"><ReactMarkdown source={PageContent} /></div>
        </div>
        {message}        
        <div className="row">
          <div className="column"><input onChange={this.setServiceLocation} type="text" placeholder="Location is http://localhost:8080/api/v1/. Change here." id="location"/></div>
          <div className="column"><input onChange={this.setAPIKey} type="text" placeholder="Place API key here." id="apikey"/></div>
          <button className="button button-outline" onClick={this.getProducts}>Load Products</button>
        </div>
        <div className="row">
          <div className="column">
             <h1>Products</h1>
             <div className="row">
              <div className="column"><h6><p style={{ paddingLeft: '5px', backgroundColor: '#455A64', fontWeight: 'bold', color: 'white' }}>Data from Product Review Aggregation Service. Endpoint GET /products</p></h6></div>
             </div>             
             <Products products={this.state.products} showDetails={this.showProductDetails}/>
             <h1>Product Details</h1>
             <div className="row">
              <div className="column"><h6><p style={{ paddingLeft: '5px', backgroundColor: '#455A64', fontWeight: 'bold', color: 'white' }}>Data from Product Review Aggregation Service. Endpoint GET /productinfo/~SKU~</p></h6></div>
             </div>             
             <ProductDetails productDetails={this.state.productDetails}/>
          </div>
        </div>
      </div>
    )
  }
}