import Head from '../components/Head';
import Menu from '../components/Menu';
import Link from 'next/link'
const ReactMarkdown = require('react-markdown');
const PageContent = require('../blog/what-is-new');

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
      <div className="column"></div>
      <style jsx>{`
      .button-next {
        color: #ac1e37;
        border: 0.1rem solid #ac1e37;
        margin-right: 5px;
      }
      .button-next:hover {
        color: #ac1e37;
        font-weight: bold;
        border: 0.2rem solid #ac1e37;
      }     
      .button-next:hover {
        color: #ac1e37;
        font-weight: bold;
        border: 0.2rem solid #ac1e37;
      }
      `}</style>
      <div className="column column-offset-50"><Link href="/demo-setup"><button className="button button-outline button-next">Next: Demo Setup</button></Link></div>
    </div>
  </div>