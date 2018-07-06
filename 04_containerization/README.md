# Dockerize an application

## Table of content

*	[What is a Docker container?](#what-is-a-docker-container)
*	[Why would I use a Docker container?](#why-would-i-use-a-docker-container)
*	[Dockerize API Builder service](#dockerize-api-builder-service)
*	[Methods of Logging in Docker](#methods-of-logging-in-docker)
## What is a Docker container

A container image is a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings. Available for both Linux and Windows based apps, containerized software will always run the same, regardless of the environment. Containers isolate software from its surroundings, for example differences between development and staging environments and help reduce conflicts between teams running different software on the same infrastructure.

## Why would I use a Docker container

* __Flexible__: Even the most complex applications can be containerized.
* __Lightweight__: Containers leverage and share the host kernel.
* __Interchangeable__: You can deploy updates and upgrades on-the-fly.
* __Portable__: You can build locally, deploy to the cloud, and run anywhere.
* __Scalable__: You can increase and automatically distribute container replicas.
* __Stackable__: You can stack services vertically and on-the-fly.

## Dockerize API Builder service

__NOTE__: The following demo is using API Builder CLI to create an app which later on will be dokerized and run from a container.

#### Prerequisites

Here are the technical requirements for being able to execute the steps suggested in this guide. You need to have the following installed:

1. Docker - The installation of Docker is via dedicated installer for specific operation system. [Read the official guide for how to install Docker](https://docs.docker.com/install/).
1. API Builder CLI - It is a node module published in [npm public repository](https://www.npmjs.com/package/@axway/api-builder). Basically, it is a one line command as follows:

```sh
npm install -g @axway/api-builder
```

#### 1. Generate API Builder service
```sh
api-builder init <SERVICE_NAME>
cd <SERVICE_NAME>
```
Docker can build images automatically by reading the instructions from a Dockerfile. The __Dockerfile__ defines what goes on in the environment inside your container. Access to resources like networking interfaces and disk drives is virtualized inside this environment, which is isolated from the rest of your system, so you need to map ports to the outside world, and be specific about what files you want to “copy in” to that environment. However, after doing that, you can expect that the build of your app defined in this __Dockerfile__ behaves exactly the same wherever it runs.

#### 2. API Builder Service Dockerfile

A sample __Dockerfile__ comes by default in the root of your scaffolded API Builder service:

```sh
# This line defines which node.js Docker image to leverage
# Available versions are described at https://hub.docker.com/_/node/
FROM node:8-alpine
 
# Denotes to copy all files in the project to 'app' folder in the container
COPY . /app
 
# Sets the default working directory to /app which is where we've copied the project files to.
WORKDIR /app
 
# Install service dependencies relevant for production builds skipping all development dependencies.
RUN npm install --production --no-optional
# Starts the service
CMD ["node", "."]
```
__NOTE__: Inside the docker file you can set ENV variables, LABEL, USER etc. Read more on the [offcial documentation](https://docs.docker.com/engine/reference/builder/#usage). 

#### 3. Build the image and run the service within Docker container
Execute the following command:
```sh
docker build -t <image_name> ./
## Execute Docker image
docker run --name <container_name> -p <ports> -d <image_name>
## -p tag will open/match the ports of the vm with the physical machine
```

__That’s it!__ You don’t need NODE or all the dependencies of your app on your system , nor does building or running this image install them on your system. It doesn’t seem like you’ve really set up an environment with Node and your App, but you have one.

## Methods of Logging in Docker
__Microservices__ developed with __API Builder__ stream all their logs to the console/standard out. This allows for much greater flexibility in log processing, for more information see [here](http://12factor.net/logs). 
As an example of how you can leverage this flexibility see our [documentation](https://techweb.axway.com/confluence/display/RDAPI/API+Builder+-+Export+API+Builder+Logs+into+a+Data+Store#APIBuilder-ExportAPIBuilderLogsintoaDataStore-Docker/Splunk) on integrating with Splunk. 

#### Logging in Docker are via the Application

Logging via the Application is likely what most developers are familiar with. In this process, the application running inside the container handles its own logging using a logging framework. For instance, a API Builder Logs are using JSON logging utility to format and send logs in the console.

To see the logs of your running container execute:

```sh
docker logs <container_name> --details
```
__NOTE__: For more information on the different aproaches and detailed configuration you can visit the [Docker HUB documentation](https://docs.docker.com/config/containers/logging/).

### Reading Next

[Chapter 05. Scalable Deployments (with Kubernetes)](../05_kubernetes)