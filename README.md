# Before you start

There is two way of reading the provided documentaiton in this project:

1) Read the README.md files and follow the navigation links

2) Run `npm i && npm start` in the root of this project and [read as booklet in your browser](http://localhost:4000).

# API Builder Standalone Tech Enablement

The goal of this tech enablement is to show how API Builder can be used to solve a customer's problem in the "real-world".

## Introduction

The customer believes that if they go to the containers, using microservices they can quickly deliver new and interesting business value, utilising their existing assets.

The customer has a 2 separate databases owned by two separate departments and wants to use API Builder to combine them and generate new and interesting business value in GKE.

The customer:

1. Has an existing product database in MySQL
1. Has a product review database in Mongo
1. Wants to containerize these as microservices to deliver new value
1. Wants to use combine these into a product + review service that uses an external NLP API to auto-generate keyword tags.
1. Wants to use GKE and helm to deploy

## Prerequisites

* Docker
* NodeJS 8.x
* npm
* GKE
* @axway/api-builder

## Architecture

![Architecture](/images/architecture.png)

## What to read next:

[Chapter 00. What's New](./00_whats_new)

[Chapter 01. Demo Setup](./01_demo_setup)

[Chapter 02. Create microservice from a database](./02_mircoservice_from_db)

[Chapter 03. Consume External Services](./03_external_services)

[Chapter 04. Containerization](./04_containerization)

[Chapter 05. GKE](./05_gke)
