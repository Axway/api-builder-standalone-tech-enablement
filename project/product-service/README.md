# Product Microservice

## Table of content
*	[Introduction](#introduction)
*	[Prerequisites](#prerequisites)
* [Architecture and Dependencies](#architecture-and-dependencies)
*	[How to run the demo product-service](#how-to-run-the-demo-product-service)

## Introduction
> This service contains information from internal services - Product API and publicly available API.
 
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

* List all available/running containers via:
```sh
# List all available containers
docker ps -a

# List all running containers
docker ps
```

* If the DB container is not running, you could start/stop the container via the Container ID
```sh
docker start/stop <container-ID>
```

__NOTE:__ For reference please go to the MySql documentation at `project/mysql/README.md`

### Docker Build & Running the image
* If you are not build image and run the MySql DB container yet, please follow the commands below:
```sh
# Build MySql Image
docker build -t <mysql-img> ./

# Run the MySqlDB in container
docker run -p 3306:3306 --name <mysql-container-name> -e MYSQL_ROOT_PASSWORD=<your-password> -d <mysql-img>
```

### API Builder Environment Variables
The `roduct-service/conf/mysql.default.js` contains different environment variables. This is a list of the common variables that you will need to set to use this service.

| Name                 | Description                                         | Default                          |
|:---------------------|:----------------------------------------------------|:---------------------------------|
| DB_HOST	| The usign host.		| localhost |
| DB_NAME         | The nameof the MySql DB.    | productdb |
| DB_USER | The user. |  root |
| DB_PASSWORD | The user's password.  | password |

* The configuration file sample:
```js
    mysql: {
          connector: '@axway/api-builder-plugin-dc-mysql',
          connectionPooling: true,
          connectionLimit: 10,
          host: process.env.DB_HOST || 'localhost',
          port: 3306,
          database: process.env.DB_NAME || 'productdb',
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,

          // Create models based on your schema that can be used in your API.
          generateModelsFromSchema: true,

          // Whether or not to generate APIs based on the methods in generated models.
          modelAutogen: false
        }
```

* Navigate to the root of the __product-service__, now you are ready to start your service via
```sh
DB_USER=root DB_PASSWORD=password npm start
```

> Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console. 


### Testing the service
> Now, you could execute `curl` command to be sure that the service is running successfully, the DB is reached and return real data. Set up the `apikey` from the `conf/default.js` and path to the endpoint.

```sh
curl -u jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X http://localhost:8080/api/endpoints/products
```