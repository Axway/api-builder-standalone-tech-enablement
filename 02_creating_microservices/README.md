# How to make Microservice from DB

## Table of content
*	[Introduction](#introduction)
*	[Documentation and resources](#documentation-and-resources)
*	[What are data connectors and why we use them?](#what-are-data-connectors-and-why-we-use-them)
*	[Adding a Data Connector to your Microservice](#adding-a-data-connector-to-your-microservice)
* [See Data Connectors in Action](see-data-connectors-in-action)

## Introduction
> The goal of this section is to show how to create, configure and run an API Builder Microservice.
 
## Documentation and resources

* [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) - Provides detailed instructions for installing API Builder and creating an API Builder project.
* [API Builder Project](https://wiki.appcelerator.org/display/AB4/API+Builder+Project) - Provides detailed information about API Builder projects and services.
* [Axway Appcelerator Youtube Channel](https://www.youtube.com/watch?v=lgPFasrGATE) - Youtube channed where you could find Demo series and more interesting videos & tutorials
* [Appcelerator Blog](https://www.appcelerator.com/blog/) - Axway blog space.

### Prerequisites

You should have `NPM` latest version and `Node.js` latest version (^8) installed.
Tools to be installed in advance:

* Install the __API Builder Command Line Interface (CLI)__ globally using `npm`. It is a node module published in npm public repository, please find additional information on official API Builder Getting Started Guide.
* __Docker__ - The installation of Docker depends on the specific operating system, please read the details on the following page Read the official guide for Docker installation.
Research for the B.I tools and 3rd party data store i.e. Splunk, Elastic etc.

### Step 1: Create your API Builder service
Install the API Builder Command Line Interface (CLI) globally using npm.

```sh
[sudo] npm install -g @axway/api-builder
```

Once API Builder CLI is installed, you can use it to create a new project.  In the following example, the CLI will create and initialize the `./<dir>` new project directory.

```sh
api-builder init <dir>
```

__NOTE:__ `<dir>` - The directory to initialize.

Then, install the project's dependencies and start the API Builder project.

```sh
cd ./<dir>
npm install --no-optional
npm start
```

Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console.

__NOTE:__ Refer to the [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) for detailed information.

## See API Builder Services in Action

The API Builder Data Connectors can be seen in action in [api-builder-standalone-tech-enablement](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project)

#### Internal Services (other API Builder Services)
* **[Product Service](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project/product-service)** - used to collect the Product Details, `@axway/api-builder-plugin-dc-mysql` in use.
* **[Review Service](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project/review-service)** - used to collect the Reviews for Product,  `@axway/api-builder-plugin-dc-mongo` in use.


