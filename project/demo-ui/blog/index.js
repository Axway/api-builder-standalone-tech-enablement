module.exports = `![Banner](/static/images/banner.png)

# Introduction

The goal of this tech enablement is to show how API Builder can be used to simplify and accelerate a customer's move to a microservices based architecture.

## The Use Case

The customer has a monolithic application that no longer meets their needs. They are moving to a microservices architecture to avail of the benefits of scalability and autonomy.

The customer has analyzed their monolith's bounded contexts and identified two service to extract, the Product Service and the Review Service. These services are owned by separate departments, using different datasources, and the customer believes that making them into microservices will empower those departments to deliver functionality more rapidly.

They also know that, with microservices, they can quickly deliver new and interesting business value, utilising their existing assets.

The customer:

1. Has an existing product database in MySQL
1. Has a product review database in Mongo
1. Wants to deliver these the Product and Review APIs as microservices
1. Wants to provide a frontend centric microservice for consuming these services. 
1. Wants to be able to extend the frontend microservice to include an NLP API without having to re-implement the Product or Review services.

API Builder will:
1. provide the tooling for them to rapidly create data centric microservices
1. allow them to create services in a low/code no-code environment
1. make integrating with third-party services painless
1. allow them to deploy their solution where-ever they require, on premise or in the cloud.

## Demo Prerequisites

* Docker
* NodeJS >= 8.9
* npm
* @axway/api-builder
* Google Cloud SDK - gcloud
* helm

## Demo Architecture

![Architecture](/static/images/architecture.png)
`