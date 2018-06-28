# Review Service

## Table of content
*	[Introduction](#introduction)
*	[Prerequisites](#prerequisites)
*	[How to run the demo review-service](#how-to-run-the-demo-review-service)
*	[How to create own mongo container with DB](#how-to-create-own-mongo-container-with-db)

## Introduction
> This service is part of the API Builder demo services. These services are not production ready and are intended for demonstration purposes only.
> This document provides information on how to configure and run an API Builder service within a Mongo container with DB.
 
## Prerequisites
Prior to setting up a project with a connector, refer to:

* [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) - Provides detailed instructions for installing API Builder and creating an API Builder project.
* [API Builder Project](https://wiki.appcelerator.org/display/AB4/API+Builder+Project) - Provides detailed information about API Builder projects and services.

## How to run the review-service 

### Get and run the service
* Clone the repository 
```sh
git clone https://github.com/Axway/api-builder-standalone-tech-enablement.git
```

* Navigate to the review-service demo folder
```sh
cd ./api-builder-standalone-tech-enablement
cd ./02_creating_microservices/project/review-service
```

* Install all dependencies
```sh
npm install --no-optional
```

### Create mongo container with DB
* Pull Mongo Docker Image via Docker Hub. Start Mongo in container and open the ports of physical machine.
```sh
docker pull mongo
docker run -p 27017:27017 -d --name some-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u root -p password --authenticationDatabase admin
```

* Then create a DB and a Table
```sh
use admin

db.createCollection("review", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )

db.reviews.insert({
	sku: "iphone",
	review: "Very good gsm - 5 star rating"
})
```


* You could start/stop the container via the Container ID
```sh
docker start/stop <container-ID>
```

## How to create own service with Mongo container DB

This document provides a step-by-step tutorial on how to run an API Builder service within a mongo container with DB. These steps include:

### Create your API Builder project

* Add your connector

* Run your service

* These steps and their required prerequisites are described in the following sections.

### Prerequisites

You should have `NPM` latest version and `Node.js` latest version (^8) installed.
Tools to be installed in advance:

* Install the __API Builder Command Line Interface (CLI)__ globally using `npm`. It is a node module published in npm public repository, please find additional information on official API Builder Getting Started Guide.
* __Docker__ - The installation of Docker depends on the specific operating system, please read the details on the following page Read the official guide for Docker installation.
Research for the B.I tools and 3rd party data store i.e. Splunk, Elastic etc.

### Step 1: Create your API Builder project
If you already have a generated service, you can proceed to __Step 2__.
Install the API Builder Command Line Interface (CLI) globally using npm.

```sh
[sudo] npm install -g @axway/api-builder
```

Once API Builder CLI is installed, you can use it to create a new project.  In the following example, the CLI will create and initialize the ./myproject new project directory.

```sh
api-builder init <my-project>
```

Then, install the project's dependencies and start the API Builder project.

```sh
cd ./<my-project>
npm install --no-optional
npm start
```

Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console.

__NOTE:__ Refer to the [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) for detailed information.

### Step 2: Add your connector
Now, you have tested that your service is running directly on your machine.

In case, you need to stop the service, use `Ctrl + C` in your terminal where the service is running.

To add a Connector:

1. Install the Connector
1. Configure the Connector
1. Use the Connector

#### Step 2a: Install the Connector
For an example we will demonstrate you how to install and configure Mongo DC.

This is an API Builder data connector for Mongo.

```sh
npm install @axway/api-builder-plugin-dc-mongo
```

__NOTE:__ using `@latest` will pick up the latest available connector version.

A configuration file is generated for you and placed into the conf directory of your API Builder project. By default we use a host of localhost, a user of root and a password of password to connect.

#### Step 2b: Configure the Connector
Once you've configured your mongo configuration files located under `<my-project>/conf` you can start up your API Builder project and visit the console (normally found under `localhost:8080/console`). Your connector will be listed under the Connectors section of the console.

Your Mongo tables will be listed under the Models section of the console. You can now click on the gear icon to the right of the table names and generate flow based apis.

You can also reference the connector in a custom model.

```js
const Account = Arrow.Model.extend('Account', {
  fields: {
    Name: { type: String, required: true }
  },
  connector: 'mongo'
});
```

If you want to map a specific model to a specific table, use metadata. For example, to map the account model to
the table named accounts, set it such as:

```js
const Account = Arrow.Model.extend('account', {
  fields: {
    Name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
  },
  connector: 'mongo',
  metadata: {
    'mongo': {
      table: 'accounts'
    }
  }
});
```

#### Step 2c: Use the Connector
The configuration files that can contain environment variables are placed in the `<my-project>/conf` folder.

All the variables in your configuration files taken from `process.env.<VARIABLE_NAME>` can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when using an API Builder service with connectors.

### Step 3: Run Mongo via Docker
* Run latest version of Docker
* Pull Mongo Docker Image via Docker Hub

```sh
docker pull mongo
```

* Start Mongo in container and open the ports of physical machine
```sh
docker run -p 27017:27017 -d --name some-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

* Set user and passward, and access the database:
```sh
docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u root -p password --authenticationDatabase admin
```

* Create DB
```sh
use admin
```

* Create table and fill it in
```sh
USE admin

db.createCollection("review", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )

db.review.insert({
	sku: "iphone",
	review: "Very good gsm - 5 star rating"
})

export MONGO_INITDB_ROOT_USERNAME=root export MONGO_INITDB_ROOT_PASSWORD=password && npm start
```

* Using the below command you can see list of all containers and theirs IDs
```sh
docker ps -a
```

* You could start/stop the container via the Container ID / Name
```sh
docker start/stop <container-ID>
```

* Go to the root of your project (`<your-project>/config/mongo.default.js`) and set your `url` connection string needed by mongo to connect and authentificate to the database. Please find below a sample:
```js
module.exports = {
	connectors: {
		mongo: {
			connector: '@axway/api-builder-plugin-dc-mongo',
			url: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost/admin`,
			
			// Create models based on the schema that can be used in your API.
			//
			// Use this with care, API Builder determines the schema for the auto generated
			// models by sampling the collection. If the collection is empty then the schema
			// cannot be determined and so the model will not be generated.
			// This will cause issues if there are Flows/APIs depending on that model schema.
			// Instead you should prefer explicitly creating Models in the API Builder UI.
			generateModelsFromSchema: true,

			// Whether or not to generate APIs based on the methods in generated models.
			modelAutogen: false
		}
	}
};
```

#### Step 4: Run your service
Now you are ready to start your service via
```sh
npm start
```

Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console. 

Then you could navigate thru the components. 
1. Navigate to the Connectors tab. A list of the available connectors is displayed.
1. Now, navigate to the Models tab. Click the Tools icon for the Mongo connector and select Generate endpoints to create the Mongo endpoints.
1. Navigate to the API Doc & Test tab. A list of the API Endpoints is displayed.
1. Select mongo/review to display the list of the generated endpoints for the Mongo connector.
1. Select the Flow icon for one of the generated endpoints for the Mongo connector; for example, for the Find all mongo review endpoints. The API Orchestration page with all loaded connectors, nodes, and so forth is displayed.

__NOTE:__ Refer to __API Builder Flows__ and __Manage Nodes__ for detailed information.