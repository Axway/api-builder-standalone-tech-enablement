<img src="./images/banner.png" height="340" width="750">

# API Builder Standalone Tech Enablement

The goal of this tech enablement is to show how API Builder can be used to simplify and accelerate a customer's move to a microservices based architecture.

## Before you start

There are two ways of reading the provided documentation for this project:

1) Read the README.md files and follow the navigation links

2) Run `npm i && npm start` in the root of this project and [read as booklet in your browser](http://localhost:4000).

## Introduction

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

## Prerequisites

* Docker
* NodeJS >= 8.9
* npm
* @axway/api-builder
* Google Cloud SDK - gcloud
* helm

## Architecture

![Architecture](/images/architecture.png)

## What to read next:

[Chapter 00. What's New](./00_whats_new)

[Chapter 01. Demo Setup](./01_demo_setup)

[Chapter 02. Create microservice from a database](./02_mircoservice_from_db)

[Chapter 03. Consume External Services](./03_external_services)

[Chapter 04. Containerization](./04_containerization)

[Chapter 05. Kubernetes](./05_kubernetes)

[Chapter 06. Amplify](./06_amplify)
