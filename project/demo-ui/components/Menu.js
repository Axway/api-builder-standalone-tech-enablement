import React from 'react'
import Link from 'next/link'

const Menu = () => (
  <nav className="navigation">
    <style jsx>{`
        .navigation {
          background: #ac1e37;
          border-bottom: .1rem solid #d1d1d1;
          color: white;
          display: block;
          left: 0;
          max-width: 100%;
          right: 0;
          top: 0;
          width: 100%;
          z-index: 1;
        }
        .linktext {
          color: white;
          font-weight: bold;
          font-size: 13px;
        }
        a:hover {
          text-decoration: underline;
        }
        .button-white {
          color: white;
          border: 0.1rem solid white;
          margin-right: 5px;
        }
        .button-white:hover {
          color: white;
          font-weight: bold;
          border: 0.2rem solid white;
        }
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #ac1e37;
        }        
        li {
            float: left;
        }        
        li a {
            display: block;
            color: white;
            text-align: center;
            padding: 6px 10px;
            text-decoration: none;
        }        
        li a:hover:not(.active) {
            background-color: #454e53;
        }
      `}</style>
    <ul>
      <li><Link href="/index"><a className="linktext">1.Introduction</a></Link></li>
      <li><Link href="/what-is-new"><a className="linktext">2.What is New?</a></Link></li>
      <li><Link href="/demo-setup"><a className="linktext">3.Demo Setup</a></Link></li>
      <li><Link href="/microservice"><a className="linktext">4.Create Microservice</a></Link></li>
      <li><Link href="/external-services"><a className="linktext">5.Talk to External Service</a></Link></li>
      <li><Link href="/containerization"><a className="linktext">6.Containerize</a></Link></li>
      <li><Link href="/deployment"><a className="linktext">7.Deploy</a></Link></li>
      <li><Link href="/projects"><a className="linktext">8.Projects</a></Link></li>
      <div className="clearfix">
        <div className="float-right">
          <Link href="/demo"><button className="button button-outline button-white">Live Demo</button></Link>
        </div>
      </div>      
    </ul>
  </nav>
)

export default Menu