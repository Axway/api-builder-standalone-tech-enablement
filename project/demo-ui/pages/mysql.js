import Head from '../components/Head';
import Menu from '../components/Menu';
import Link from 'next/link'
const ReactMarkdown = require('react-markdown');
const PageContent = require('../blog/mysql');

export default () =>
  <div className="container">
    <Head/>            
    <div className="row">
      <div className="column"><Menu/></div>
    </div>

    <div className="row">
      <div className="column"><ReactMarkdown source={PageContent} /></div>
    </div>
  </div>