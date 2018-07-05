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
      `}</style>
    <section className="container">
      <a className="linktext">Learn to create> </a>
      <Link href="/index"><a className="linktext">1.Introduction </a></Link>
      ><Link href="/what-is-new"><a className="linktext"> 2.What is New? </a></Link>
      ><Link href="/demo-setup"><a className="linktext"> 3.Demo Setup </a></Link>
      ><Link href="/microservice"><a className="linktext"> 4.From DB to Microservice </a></Link>
      ><Link href="/external-services"><a className="linktext"> 5.External Services </a></Link>
      ><Link href="/containerization"><a className="linktext"> 6.Containerization </a></Link>
      ><Link href="/deployment"><a className="linktext"> 7.Scalable Deployments  </a></Link>
    </section>
    <br/>
    <section className="container">      
      <a className="linktext">Try existing> </a>
      <Link href="/product-service"><a className="linktext"> Product Service  </a></Link>/
      <Link href="/review-service"><a className="linktext"> Review Service  </a></Link>/
      <Link href="/product-review-service"><a className="linktext"> Product Review Service  </a></Link>/
      <Link href="/mysql"><a className="linktext"> Containerize MySQL  </a></Link>/
      <Link href="/mongo"><a className="linktext"> Containerize MongoDB  </a></Link>
    </section>
    <section className="container">
      <div className="clearfix">
        <div className="float-right">
          <Link href="/demo"><button className="button button-outline button-white">Live Demo</button></Link>
        </div>
      </div>  
    </section>    
  </nav>
)

export default Menu