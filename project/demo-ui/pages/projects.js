import Head from '../components/Head';
import Menu from '../components/Menu';
import Link from 'next/link'
const ReactMarkdown = require('react-markdown');
const PageContent = require('../blog/projects');

export default () =>
  <div className="container">
    <Head/>            
    <div className="row">
      <div className="column"><Menu/></div>
    </div>

    <div className="row">
      <div className="column"><ReactMarkdown source={PageContent} /></div>
    </div>
    <div className="row">
      <p>Please find bellow links to the documentation of services and how-tos created for the demo:</p>
    </div>
    <div className="row">
      <Link href="/product-service"><a className="linktext"> Product Service  </a></Link>
    </div>    
    <div className="row">
      <Link href="/review-service"><a className="linktext"> Review Service  </a></Link>
    </div>
    <div className="row">
      <Link href="/product-review-service"><a className="linktext"> Product Review Service  </a></Link>
    </div>
    <div className="row">
      <Link href="/mysql"><a className="linktext"> How to Containerize MySQL  </a></Link>
    </div>
    <div className="row">
      <Link href="/mongo"><a className="linktext"> How to Containerize MongoDB  </a></Link>
    </div>                
  </div>