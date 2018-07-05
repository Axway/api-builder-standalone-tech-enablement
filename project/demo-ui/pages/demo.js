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
      serviceLocation: null
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
    if (!products || products.length === 0) {
      //fallback to mock data
      products = require('../datasource/mock/products')
    }
    this.setState({
      products: products
    })    
  }

  showProductDetails = async (sku, event) => {
    const productDetails = await requesterAPI.get(`productinfo/${sku}`, this.state.apiKey, this.state.serviceLocation)
    if (!productDetails) {
      //fallback to mock data
      productDetails = require('../datasource/mock/productDetails')
    }    
    this.setState({
      productDetails: productDetails
    })    
  }

  render() {
    return (
      <div className="container">
        <Head />
        <div className="row">
          <div className="column"><Menu /></div>
        </div>
        <div className="row">
          <div className="column"><ReactMarkdown source={PageContent} /></div>
        </div>
        <div className="row">
          <div className="column"><input onChange={this.setServiceLocation} type="text" placeholder="Change default location http://localhost:8080/api/v1/" id="location"/></div>
          <div className="column"><input onChange={this.setAPIKey} type="text" placeholder="Place API key here" id="apikey"/></div>
          <button className="button button-outline" onClick={this.getProducts}>Get Products</button>
        </div>        
        <div className="row">
          <div className="column">
             <h1>Products</h1>
             <Products products={this.state.products} showDetails={this.showProductDetails}/>
             <h1>Product Details</h1>
             <ProductDetails productDetails={this.state.productDetails}/>
          </div>
        </div>
      </div>
    )
  }
}