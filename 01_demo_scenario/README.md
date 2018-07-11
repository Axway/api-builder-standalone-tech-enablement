# Monolith to Microservices

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

### Reading Next

[Chapter 02. Create Microservice from a Database](./02_microservice_from_db)

[Chapter 03. Consume External Services](./03_external_services)

[Chapter 04. Containerization](./04_containerization)

[Chapter 05. Demo Setup](./05_demo_setup)

[Chapter 06. Scalable Deployments (with Kubernetes)](./06_kubernetes)