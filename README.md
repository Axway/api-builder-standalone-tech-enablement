![Banner](/images/banner.png)

# API Builder Standalone Tech Enablement

The goal of this tech enablement is to show how API Builder can be used to simplify and accelerate a customer's move to a microservices based architecture.

## The Business Case

For the purpose of this Tech Enablement we developed a plausible real-world scenario with a potential customer:

* The customer has a monolithic application that no longer meets their needs. They are moving to a microservices architecture to avail of the benefits of scalability and autonomy.  They heard about [Axway API Builder](https://developer.axway.com/), that it is fast it is to create microservices, that it is free, and wish to try it out.

* The customer has analyzed their monolith's bounded contexts and identified two services to extract, the [Product Service](./project/product-service) and the [Review Service](./project/review-service).  These services are owned by separate departments, using different data sources, and the customer believes that making them into microservices will empower those departments to deliver functionality more rapidly, be easier to maintain, easier to deploy, and scale.

* The customer also knows that with API Builder microservices, they can quickly deliver new and interesting business value, utilising their existing assets, and will create a new Backend For Frontend (BFF) microservice ([Product Review Service](./project/product-review-service)) that provides new value.  The customer will use [GKE](https://cloud.google.com/kubernetes-engine/) and [helm](https://helm.sh/) to deploy the services.

* The customer:

1. Has an existing product database in MySQL

2. Has a product review database in MongoDB

3. Wants to deliver these the Product and Review APIs as microservices

4. Wants to provide a Backend For Frontend (BFF) microservice for consuming these services. 

5. Wants to be able to extend the frontend microservice to include an NLP API without having to re-implement the Product or Review services


## The API Builder Solution

API Builder will:

1. Provide the tooling for them to rapidly create data centric microservices

2. Allow them to create services in a low/code no-code environment

3. Make integrating with third-party services painless

4. Allow them to develop their Backend For Frontend (BFF) microservice

5. Allow them to deploy their solution anywhere, on premise or in the cloud

### Solution Prerequisites
* Docker
* NodeJS >= 8.9
* npm
* @axway/api-builder
* Google Cloud SDK - gcloud
* helm

### Solution Architecture

![Architecture](/images/architecture.png)


## How to Read The Materials?

You can continue reading the readme files in this repository or intsall the **Demo Web Application** we have prepared to do so.

### 1. Demo Web Application

The demo web application allows you to:

* Read the same docs in the form of web app in your browser 
* Try out a Live Demo of the services built during the tech enablement session

#### How to run Demo Web Application?

1) Clone the repository

2) Navigate to `./projects/demo-ui` folder

3) In the root of the folder execute `npm run demo`

> This will install dependencies, build the app, and open your browser to read the docs and play with the demo


### 2. Reading the Readmes

If you still decide to read directly from Readme files see what to read next:

[Chapter 00. What's New](./00_whats_new)

[Chapter 01. Demo Setup](./01_demo_setup)

[Chapter 02. Create Microservice from a Database](./02_mircoservice_from_db)

[Chapter 03. Consume External Services](./03_external_services)

[Chapter 04. Containerization](./04_containerization)

[Chapter 05. Scalable Deployments (with Kubernetes)](./05_kubernetes)