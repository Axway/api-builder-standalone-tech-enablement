# API Builder Standalone Tech Enablement Demo

The goal of this tech enablement is to show how API Builder can be used to simplify and accelerate a customer's move to a microservices based architecture.


## The Business Case

* The customer has a monolithic application that no longer meets their needs. They are moving to a microservices architecture to avail of the benefits of scalability and autonomy.  They heard about [Axway API Builder](https://developer.axway.com/), that it is fast it is to create microservices, that it is free, and wish to try it out.

* The customer has analyzed their monolith's bounded contexts and identified two services to extract, the [Product Service](../project/product-service) and the [Review Service](../project/review-service).  These services are owned by separate departments, using different data sources, and the customer believes that making them into microservices will empower those departments to deliver functionality more rapidly, be easier to maintain, easier to deploy, and scale.

* The customer also knows that with API Builder microservices, they can quickly deliver new and interesting business value, utilising their existing assets, and will create a new Backend For Frontend (BFF) microservice ([Product Review Service](../project/product-review-service)) that provides new value.  The customer will use [GKE](https://cloud.google.com/kubernetes-engine/) and [helm](https://helm.sh/) to deploy the services.

The customer:

1. Has an existing product database in MySQL

1. Has a product review database in MongoDB

1. Wants to deliver these the Product and Review APIs as microservices

1. Wants to provide a Backend For Frontend (BFF) microservice for consuming these services. 

1. Wants to be able to extend the frontend microservice to include an NLP API without having to re-implement the Product or Review services



API Builder will:

1. Provide the tooling for them to rapidly create data centric microservices

1. Allow them to create services in a low/code no-code environment

1. Make integrating with third-party services painless

1. Allow them to develop their Backend For Frontend (BFF) microservice

1. Allow them to deploy their solution anywhere, on premise or in the cloud


## The Demo Project

There is a completed suite of sample projects in the [project](../project/) folder.

![Project](./images/api-builder-topology.svg)

### Datastores

For simplicilty this demo has preconfigured containers for the datastores, in the real world the microservices would be connecting to your enterprise database. This demo contains two datastore containers:

* MySql ([/project/mysql](../project/mysql))
    The database is named _productdb_ and contains a single table _products_. This data is owned by the _Product Service_.
* MongoDB ([/project/mongo](../project/mongo))
    The database is named _admin_ and contains a single collection called _review_. This data is owned by the _Review Service_.

Building the database containers:

```bash
docker build -t axway/api-builder-v4-demo-mysql project/mysql
docker build -t axway/api-builder-v4-demo-mongo project/mongo
```

Running the database containers (for debug purposes it can be useful to not run these as daemons):
```bash
docker run -it --name mysql axway/api-builder-v4-demo-mysql
docker run -it --name mongo axway/api-builder-v4-demo-mongo
```

The default credentials for the databases are:
* MySql: apibuilder/apibuilder (or root/password)
* MongoDB: apibuilder/apibuilder

To get the IP address of a running container:

```bash
docker inspect --format '{{ .NetworkSettings.IPAddress }}' mysql
docker inspect --format '{{ .NetworkSettings.IPAddress }}' mongo
```

### Microservices

The demo consists of 3 services:

#### [Product Service](../project/product-service)

This microservice owns the product data in the MySql _productdb_. It provides two APIs for accessing the data:
* Find All (*GET /api/endpoints/products*)
* Find By SKU (*GET /api/endpoints/products/:sku*)

These are implemented using orchestrated flows as discussed in [Chapter 02. Create Microservice from a Database](../02_microservice_from_db).

The configuration is environmentalized as discussed in [Chapter 04. Containerization](../04_containerization), and it require the database details to be set.

To run the _Product Service_ and connect to the containerized MySql database:

```bash
npm install
DB_HOST=172.17.0.2 DB_USER=apibuilder DB_PASSWORD=apibuilder node .
```

#### [Review Service](../project/review-service)

This microservice owns the review data in the Mongo _admin_ database. It provides a single API for accessing the data:

* Find By SKU (*GET /api/endpoints/review/:sku*)

To run the _Review Service_ and connect to the containerized Mongo database:

```bash
npm install
PORT=8081 DB_HOST=172.17.0.3 DB_USER=apibuilder DB_PASSWORD=apibuilder node .
```

> If running _Product Service_ and _Review Service_ on the same host they can also take a _PORT_ environment variable to configure what port they run on.

#### [Product Review Service](../project/product-review-service)

In a real solution the _Product Review Service_ would be you _backend for frontends_ - it is the external API for clients to connect to. This microservice will aggregate the data from the _Review Service_ and the _Product Service_. Also to illustrate how the flow based orchestration can be leveraged to add additional value it will also connect out to a 3rd party service _Parallel Dots_ to get addtional information for the response.

It provides a 2 APIs for accessing the data:

* Find All Products (*GET /api/v1/products*)
* Find By SKU (*GET /api/v1/productinfo/:sku*)

Before proceeding you need to sign up and get an API Key from Parallel Dots [http://www.paralleldots.com](https://user.apis.paralleldots.com/signing-up?utm_source=website&utm_medium=homepage&utm_campaign=signup).

Also as this service is aggeragting data from the other microservices it requires details of how to connect to those services. The environment variables expected are:

| Env        | Description           | Value  |
| ------------- | ------------- | -----|
| PD_APIKEY       | The Parallel Dots API key. | _your own key_ |
| PRODUCT_HOST | The host running the _Product Service_ | localhost |
| PRODUCT_PORT | The port _Product Service_ is listening on | 8080 |
| PRODUCT_APIKEY | The API key of the _Product Service_ | jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X |
| REVIEW_HOST | The host running the _Review Service_ | localhost |
| REVIEW_PORT | The port _Review Service_ is listening on | 8081 |
| REVIEW_APIKEY | The API key of the _Product Service_ | CI5Uaei7o3AqI/J85trGCkYEjY/R7Q0v |

As a single (very long command) this is:

```bash
PORT=8082 PD_APIKEY=your_pd_key \
PRODUCT_HOST=localhost PRODUCT_PORT=8080 PRODUCT_APIKEY=jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X \
REVIEW_HOST=localhost REVIEW_PORT=8081 REVIEW_APIKEY=CI5Uaei7o3AqI/J85trGCkYEjY/R7Q0v \
node .
```

At this point you can connect to the API Builder Console for the _Product Review Service_ [http://localhost:8082/console](http://localhost:8082/console) and test the APIs.

### Frontend

The project also includes an example UI application that invokes the _Product Review Service_ APIs, the [project/demo-ui](../project/demo-ui). To launch:

```bash
npm run demo
```

![demo-ui](./images/demo-ui.png)

Fill in the URL for the API - http://localhost:8082/api/v1 and the API Key for the _Products Review Service_ *IO/lU6QSMfze2W3cOsUMC0iGztPLNwL+*. Clicking _Load Products_ will call the _/api/v1/products_ endpoint, and then drilling down on the details will call the _/api/v1/productinfo/:sku_ endpoint.

![demo-ui-data](./images/demo-ui-data.png)

### Reading Next

[Chapter 02. Create Microservice from a Database](../02_microservice_from_db)

[Chapter 03. Consume External Services](../03_external_services)

[Chapter 04. Containerization](../04_containerization)

[Chapter 05. Scalable Deployments (with Kubernetes)](../05_kubernetes)