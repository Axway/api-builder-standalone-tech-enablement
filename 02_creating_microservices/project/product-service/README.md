# Product Microservice

## Table of content
*	[Introduction](#introduction)
*	[Prerequisites](#prerequisites)
* [Architecture and Dependencies](#architecture-and-dependencies)
*	[How to run the demo product-service](#how-to-run-the-demo-product-service)
*	[How to create own mysql container with DB](#how-to-create-own-mysql-container-with-db)

## Introduction
> This service aggregates information from internal services - Product API and publicly available API.
 
## Prerequisites
Prior to setting up a project with a connector, refer to:

* [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) - Provides detailed instructions for installing API Builder and creating an API Builder project.
* [API Builder Project](https://wiki.appcelerator.org/display/AB4/API+Builder+Project) - Provides detailed information about API Builder projects and services.

## Architecture and Dependencies

### Internal
- product-service
 
### External
* MySql DB - the API used for configure and run an API Builder Service within a MySql container with DB.

## How to run the product-service 

### Get and run the service
* Clone the repository 
```sh
git clone https://github.com/Axway/api-builder-standalone-tech-enablement.git
```

* Navigate to the product-service demo folder
```sh
cd ./api-builder-standalone-tech-enablement/02_creating_microservices/project
cd ./product-service
```

* Install all dependencies
```sh
npm install --no-optional
```

### Start the existing Mysql container
Once you have already build the image from `mysql/Dockerfile` and run the container, you will be able to run the Product-Service with the `@axway/api-builder-plugin-dc-mysql`.

__NOTE:__ For reference please go to the MySql documentation at `01_demo_setup/project/mysql/README.md`

* If the DB container is not running, you could start/stop the container via the Container ID
```sh
docker start/stop <container-ID>
```

* If you are not run yet the MySql DB container, please follow the commands below:
```sh
// Build MySql Image
docker build -t <mysql-img> ./

// Run the MySqlDB in container
docker run -p 3306:3306 --name <mysql-container-name> -e MYSQL_ROOT_PASSWORD=<your-password> -d <mysql-img>
```

* Navigate to the root of the __product-service__, now you are ready to start your service via
```sh
MYSQL_USER=root MYSQL_PASSWORD=password npm start
```

> Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console. 

* Now, you could execute `curl` command to be sure that the service is running successfully, the DB is reached and return real data. Set up the `apikey` from the `conf/default.js` and path to the endpoint.

```sh
curl -u jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X http://localhost:8080/api/endpoints/products
```

__NOTE:__ if you haven't any records in the DB yet, the response will be empty array i.e. `[]`

## How to create own Service with MySql container DB

This document provides a step-by-step tutorial on how to run an API Builder service within a mysql container with DB. These steps include:

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
For an example we will demonstrate you how to install and configure MySQL DC.

The mysql library used by this connector depends on a MySQL server setting NO_BACKSLASH_ESCAPES to mitigate against SQL injection attacks.  This setting must be disabled (which is the default setting for MySQL servers).

This is an API Builder data connector for MySQL.

```sh
npm install @axway/api-builder-plugin-dc-mysql
```

__NOTE:__ using `@latest` will pick up the latest available connector version.

A configuration file is generated for you and placed into the conf directory of your API Builder project. By default we use a host of localhost, a user of root and a password of password to connect.

#### Step 2b: Configure the Connector
Once you've configured your mysql configuration files located under `<my-project>/conf` you can start up your API Builder project and visit the console (normally found under `localhost:8080/console`). Your connector will be listed under the Connectors section of the console.

Your MySQL tables will be listed uner the Models section of the console. You can now click on the gear icon to the right of the table names and generate flow based apis.

You can also reference the connector in a custom model.

```js
const Account = Arrow.Model.extend('Account', {
  fields: {
    Name: { type: String, required: true }
  },
  connector: 'mysql'
});
```

If you want to map a specific model to a specific table, use metadata. For example, to map the account model to
the table named accounts, set it such as:

```js
const Account = Arrow.Model.extend('account', {
  fields: {
    Name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
  },
  connector: 'mysql',
  metadata: {
    'mysql': {
      table: 'accounts'
    }
  }
});
```

#### Step 2c: Use the Connector
The configuration files that can contain environment variables are placed in the `<my-project>/conf` folder.

All the variables in your configuration files taken from `process.env.<VARIABLE_NAME>` can be provided when running the Docker container.

The following table lists the configuration files, their location, and their example content. The connector configuration is shown to inform you that you will have to provide an additional set of environment variables when using an API Builder service with connectors.

### Step 3: Run MySql via Docker
* Run latest version of Docker
* Pull Mysql Docker Image via Docker Hub

```sh
docker pull mysql
```

* Start MySql in container and open the ports of physical machine
```sh
docker run -p 3306:3306 --name <container-name> -e MYSQL_ROOT_PASSWORD=<my-password> -d mysql:5
```

__NOTE:__ `MYSQL_ROOT_PASSWORD` variable is mandatory and specifies the password that will be set for the MySQL `root` superuser account. In the above example, it was set to `<my-password>`. The `<container-name>` is the name of your container i.e. mysql-db, mysql-container, etc.

* Set user and passward, execute the following command
```sh
docker exec -it <container-name> mysql -uroot -p<my-password>
```

* Create DB
```sh
CREATE DATABASE productdb;
```

* Use the newly created DB
```sh
USE productdb;
```

* Create table
```sh
CREATE TABLE products(
    ID INT NOT NULL AUTO_INCREMENT,
    sku nvarchar(255),
    name nvarchar(255),
    PRIMARY KEY(ID)
);
```

* Using the below command you can see listof the running containers and theirs IDs
```sh
docker ps
```

* You could start/stop the container via the Container ID
```sh
docker start/stop <container-ID>
```

* Go to the root of your project (`<your-project>/config/mysql.default.js`) and set database to `<your-db-name>`. The user and password are using Env Variables `process.env.MYSQL_USER` and `process.env.MYSQL_PASSWORD`, the values will be taken runtime. Please find below a sample:
```js
module.exports = {
    connectors: {
        mysql: {
            connector: '@axway/api-builder-plugin-dc-mysql',
            connectionPooling: true,
            connectionLimit: 10,
            host: 'localhost',
            port: 3306,
            database: 'productdb',
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,

            // Create models based on your schema that can be used in your API.
            generateModelsFromSchema: true,

            // Whether or not to generate APIs based on the methods in generated models.
            modelAutogen: false
        }
    }
};
```

#### Step 4: Run your service
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


* Now, you could execute `curl` command to be sure that the service is running successfully, the DB is reached and return real data. Set up the `apikey` from the `conf/default.js` and path to the endpoint.

```sh
curl -u jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X http://localhost:8080/api/endpoints/products
```

__NOTE:__ if you haven't any records in the DB yet, the response will be empty array i.e. `[]`
