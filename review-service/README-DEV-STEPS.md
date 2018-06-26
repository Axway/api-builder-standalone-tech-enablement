## Introduction
The generation of an API Builder applications is a simple process with the help of the API Builder CLI tool.

This document provides a step-by-step tutorial on how to run an API Builder service within a api-builder-plugin-dc-mongo connector. These steps include:

#####a.How to use this in your own project starting from zero to hero
#####b.How to use start this source code 

#How to use start this source code 

clone this repo and navigate to the folder ./preview-service and run in the terminal:

```sh
npm install
```
Run latest version of Docker
Pull Mongo 3.6 > Docker Image via Docker Hub

In terminal run:
```
docker run -p 27017:27017 -d --name some-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```
```sh
docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u root -p password --authenticationDatabase admin
```
1. Use the newly created DB
```sh
USE admin
```

2. Create table
```sh
db.createCollection("reviews", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
```
3. Fill the table
```sh
db.reviews.insert({
	sku: "iphone",
	review: "Very good gsm - 5 star rating"
})
```
####and finally run: 
```sh
npm start
```

#How to use this in your own project starting from zero to hero
## Create your API Builder project

* Add your api-builder-plugin-dc-mongo connector

* Run your service

* These steps and their required prerequisites are described in the following sections.

## Prerequisites
You should have `NPM` latest version and `Node.js` latest version (^8) installed.
Tools to be installed in advance:

* Install the API Builder Command Line Interface (CLI) globally using `npm`. It is a node module published in npm public repository, please find additional information on official API Builder Getting Started Guide.

```sh
[sudo] npm install -g @axway/api-builder
```

* Docker - The installation of Docker depends on the specific operating system, please read the details on the following page Read the official guide for Docker installation.
Research for the B.I tools and 3rd party data store i.e. Splunk, Elastic etc.

## Step 1: Create your API Builder project
Install the API Builder Command Line Interface (CLI) globally using npm.

```sh
[sudo] npm install -g @axway/api-builder
```

Once API Builder CLI is installed, you can use it to create a new project.  In the following example, the CLI will create and initialize the ./review-service new project directory.

```sh
api-builder init review-service
```

Then, install the project's dependencies and start the API Builder project.

```sh
cd ./review-service
npm install --no-optional
npm start
```

Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console.

__NOTE:__ Refer to the API Builder Getting Started Guide for detailed information.

## Step 2: Add your connector
Now, you have tested that your service is running directly on your machine.

In case, you need to stop the service, use Ctrl + C in your terminal where the service is running.

To add a Connector:

1. Install the Connector
2. Configure the Connector
3. Use the Connector

### Step 2a: Install the Connector
For an example we will demonstrate you how to install and configure __api-builder-plugin-dc-mongo__.

This is an API Builder data connector for MonGo.

```sh
npm install @axway/api-builder-plugin-dc-mongo
```

__NOTE:__ using `npm install @axway/api-builder-plugin-dc-mongo@latest` will pick up the latest available connector version.

A configuration file is generated for you and placed into the conf directory of your API Builder project. By default in the connection string for mongo we use a host of localhost user of root and a password of password to connect.

### Step 2b: Configure the Connector
Once you've configured your mongo configuration files located under <project>/conf you can start up your API Builder project and visit the console (normally found under localhost:8080/console). Your connector will be listed under the Connectors section of the console.

Your Mongo tables will be listed uner the Models section of the console. You can now click on the gear icon to the right of the table names and generate flow based apis.

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

### Step 2c: Use the Connector
The configuration files that can contain environment variables are placed in the `<SERVICE_FOLDER>/conf` folder.

All the variables in your configuration files taken from `process.env.<VARIABLE_NAME>` can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when using an API Builder service with connectors.

## Step 3: Run Mongo via Docker
3.1. Run latest version of Docker
3.2. Pull Mongo 3.6 > Docker Image via Docker Hub

```sh
docker pull mongo
```

3.3. Start Mongo in container and open the ports of physical machine
```sh
docker run -p 27017:27017 -d --name some-mongo -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

3.4. To access the database through the terminal, execute the following command
```sh
docker run -it --rm --link some-mongo:mongo mongo mongo --host mongo -u root -p password --authenticationDatabase admin
```
3.5. Use the newly created DB
```sh
USE admin
```

3.6 Create table
```sh
db.createCollection("reviews", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
```
3.7. Fill the table
```sh
db.reviews.insert({
	sku: "iphone",
	review: "Very good gsm - 5 star rating"
})
```

3.8. Using the below command you can see list of all containers and theirs IDs
```sh
docker ps -a
```

3.9. You could start/stop the container via the Container ID
```sh
docker start <ID>

or

docker stop <ID>
```

3.10. Go to the root of your project (`<your-project>/config/mongo.default.js`) and set up the connection string for mongo with some params like user,password and localhost. Please find below a sample:
```js
module.exports = {
	connectors: {
		mongo: {
			connector: '@axway/api-builder-plugin-dc-mongo',
			url: 'mongodb://root:password@localhost/admin',
			
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

__NOTE:__ Now you are ready to start your service via `npm start`. Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console.

## Step 4: Run your service
Once you have scaffold project, install Mongo connector and run successfully your service, you will be able to point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console. Then you could navigate thru the components. 
1. Navigate to the Connectors tab. A list of the available connectors is displayed.
1. Now, navigate to the Models tab. Click the Tools icon for the Mongo connector and select Generate endpoints to create the Mongo endpoints.
1. Navigate to the API Doc & Test tab. A list of the API Endpoints is displayed.
1. Select reviews to display the list of the generated endpoints for the Mongo connector.
1. Select the Flow icon for one of the generated endpoints for the Mongo connector; for example, for the Find all reviews endpoint. The API Orchestration page with all loaded connectors, nodes, and so forth is displayed.

__NOTE:__ Refer to API Builder Flows and Manage Nodes for detailed information.

