# API Builder Standalone Tech Enablement

The goal of this tech enablement is to show how API Builder can be used to solve a customer's problem in the "real-world".

## Introduction

The customer believes that if they go to the containers, using microservices they can quickly deliver new and interesting business value, utilising their existing assets.

The customer has a 2 separate databases owned by two separate departments and wants to use API Builder to combine these and generate new and interesting business value in GKE.

The customer:

1. Has an existing product database in MySQL
1. Has a product review database in Mongo
1. Wants to containerize these as microservices to deliver new value
1. Wants to use combine these into a product + review service that uses a sentiment API to rate the reviews, allowing their internal business and marketing departments to assess satisfaction.
1. Wants to use GKE and helm to deploy

## Architecture

![GitHub Logo](/images/architecture.png)

## Guide

[00 What's New](./00_whats_new)
[01 Demo Setup](./01_demo_setup)
[02 Creating Microservices](./02_creating_microservices)
[03 Containerization](./03_containerization)
[04 GKE](./04_gke)
