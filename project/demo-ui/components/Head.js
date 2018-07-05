import React from 'react'
import Head from 'next/head';


export default class MyHead extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return <Head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                <title>API Builder Standalone</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="../static/images/favicon.ico" />                
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"/>
                <link rel="stylesheet" href="../static/css/normalize.css"/>
                <link rel="stylesheet" href="../static/css/milligram.min.css"/>
            </Head>
    }
}