# How to make Microservice from DB

## Table of content
*	[Introduction](#introduction)
*	[Documentation and resources](#documentation-and-resources)
*	[Architecture and Dependencies](#architecture-and-dependencies)
*	[How to create own service in container with DB](#how-to-create-own-service-in-container-with-db)

## Introduction
> The goal of this section is to show how to create, configure and run an API Builder Microservice within a Data Connector from DB.
 
## Documentation and resources

* [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) - Provides detailed instructions for installing API Builder and creating an API Builder project.
* [API Builder Project](https://wiki.appcelerator.org/display/AB4/API+Builder+Project) - Provides detailed information about API Builder projects and services.
* [Axway Appcelerator Youtube Channel](https://www.youtube.com/watch?v=lgPFasrGATE) - Youtube channed where you could find Demo series and more interesting videos & tutorials
* [Appcelerator Blog](https://www.appcelerator.com/blog/) - Axway blog space.

## API Builder Data Connectors

Connectors are adapters to allow you to read and write data to and from an external data source, such as Oracle, MySQL, and MongoDB. They give your application the ability to utilize existing data sources to create Models for use within your API Builder application, either directly as API, or within flows.

#### Available connectors
The supported connectors for 4.0 are available for download directly from NPM:

* `@axway/api-builder-plugin-dc-mongo` - Mongo DB
* `@axway/api-builder-plugin-dc-mysql` - MySql DB
* `@axway/api-builder-plugin-dc-oracle` - Oracle DB

__NOTE:__ Refer to [API Builder Connectors](https://wiki.appcelerator.org/display/AB4/API+Builder+Connectors) for detailed information.

## Adding a Data Connector to your Microservice

> This document provides a _step-by-step_ tutorial on how to run an API Builder service within a connector in container with DB. These steps include:

### Step 1: Install the Connector
To install a data connector, navigate to the root directory of your service and use the following command; for example,to install the MySQL data connector:

```sh
npm install @axway/api-builder-plugin-dc-<connector-name>
```

### Step 2: Configure the Connector
When you install a connector, it will create a configuration file located in the `<SERVICE_FOLDER>/conf` folder that has the name of your connector. For example, `mysql.default.js`. You will need to edit this file and give it the required connection details such as database host and port, user, password, and database.

The configuration files that can contain environment variables are placed in the `<SERVICE_FOLDER>/conf` folder.

All the variables in your configuration files taken from `process.env.<VARIABLE_NAME>` can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when using an API Builder service with connectors.

| Configuration File                 | Location                                         | Example                          |
|:---------------------|:----------------------------------------------------|:---------------------------------|
| Service Configuration	| __<SERVICE_FOLDER>/conf/default.js__		| 	`module.exports = {` <br><span style="padding-left:1em"> `apiKey: process.env.APIKEY`</span> <br><span style="padding-left:2em"> `port: parseInt(process.env.PORT) || 8080 `</span><br> `};` |
| | | |
| Connector Configuration | __<SERVICE_FOLDER>/conf/mysql.default.js__ | `module.exports = {`<br><span style="padding-left:1em"> `connectors: {` </span> <br><span style="padding-left:2em"> `mysql: {` </span> <br><span style="padding-left:3em"> `connector:` </span> <br><span style="padding-left:4em"> `'@axway/api-builder-plugin-dc-mysql',`</span> <br><span style="padding-left:4em">`connectionPooling: true,`</span> <br><span style="padding-left:4em">`connectionLimit: 10,`</span><br><span style="padding-left:4em">`host: process.env.MYSQL_HOST || 'localhost'`</span> <br><span style="padding-left:4em">`port: 3306,`</span> <br><span style="padding-left:4em">`database: 'mysql',`</span> <br><span style="padding-left:4em">`user: process.env.MYSQL_USER,`</span> <br><span style="padding-left:4em">`password: process.env.MYSQL_PASSWORD,`</span> <br><span style="padding-left:4em">`generateModelsFromSchema: true,`</span> <br><span style="padding-left:4em">`modelAutogen: false`</span> <br><span style="padding-left:2em">`}`</span> <br><span style="padding-left:1em">`}`</span> <br>`};`|

__NOTE:__ You will need to configure your connector with connection details before starting your application or it will fail to start. For additional configuration details, refer to the connector.

#### API Builder Models
Your connector tables will be listed uner the Models section of the console. You can now click on the gear icon to the right of the table names and generate flow based apis.

Once you've configured your MySQL configuration files located under `<dir>/conf` you can start up your API Builder project and visit the console (normally found under `localhost:8080/console`). Your connector will be listed under on the Connectors tab of the console.

![Connectors](./images/Connectors-Tab.png)

Your MySQL tables will be listed under the Models tab of the console.

![Models](./images/Models-Tab.png)

#### Using connector models in flows
To use the connector model in a flow, select the Flow icon for one of the generated endpoints for the connector; for example, for the Find all mysqlPersons endpoint. The API Orchestration page with all loaded connectors, flow-nodes, and so forth is displayed. For additional information on using a connector model in a flow, refer to [Manage Flows](https://wiki.appcelerator.org/display/AB4/Manage+Flows).

![Flow](./images/Flow.png)

#### Step 3: Run your data connector enabled Microservice
Now, you are ready to start your service via
```sh
MYSQL_USER=root MYSQL_PASSWORD=password npm start
```

Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console. 

Then you could navigate thru the components. 
1. Navigate to the Connectors tab. A list of the available connectors is displayed.
1. Now, navigate to the Models tab. Click the Tools icon for the MySQL connector and select Generate endpoints to create the MySql endpoints.
1. Navigate to the API Doc & Test tab. A list of the API Endpoints is displayed.
1. Select mysql/products to display the list of the generated endpoints for the MySQL connector.
1. Select the Flow icon for one of the generated endpoints for the MySQL connector; for example, for the Find all mysqlPersons endpoint. The API Orchestration page with all loaded connectors, nodes, and so forth is displayed.

__NOTE:__ Refer to __API Builder Flows__ and __Manage Nodes__ for detailed information.


* Now, you could execute `curl` command to be sure that the service is running successfully, the DB is reached and return real data. Set up the `apikey` from the `<dir>/conf/default.js` and path to the endpoint.

```sh
curl -u <apikey> http://localhost:8080/api/endpoints/products
```

__NOTE:__ if you haven't any records in the DB yet, the response will be empty array i.e. `[]`


