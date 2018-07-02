WIP

# API Builder Standalone

## What's new
* No dependency to appc
* New CLI (@axway/api-builder)
* Revised logging format to stream to stdout
* Revised configuration to have only `default` and `local` sets of configuration files
* Changes to load data connectors as npm modules (plugins)
* Added new asynchronous HTTP rest client plugin to the flow
* Added new asynchronous Swagger plugin to the flow
* Flows now have input parameters and autocomplete

### Standalone

API Builder is now standalone and no longer requires `appc`, or the Appcelerator cloud.  API Builder is a **free** NodeJS / ExpressJS application to help companies rapidly build microservices using reusable components, and then build these services into containers to deploy into any container platform.  API Builder is not a container itself.

### Logging

Previously, API Builder wrote to a logs directory.  Now, it only streams to stdout.  To be amenable to 12-factor application to [treat logs as event streams](https://12factor.net/logs), applications should not log to file.

### Configuration

Previously, API Builder had specific configuration files per-environment.  Now, API Builder has simplified configuration with two sets of configuration files called `default` and `local`.  A 12-factor application should be [environment agnostic](https://12factor.net/config) so the environment specific configuration sets (e.g. `production` were removed).  Furthermore, the recommended way to [keep environments as similar as possible](https://12factor.net/dev-prod-parity), is to use OS environment variables (i.e. `process.env`), e.g. for [port binding](https://12factor.net/port-binding), authentication settings, remote host settings, etc.

### Connectors

Previously, API Builder needed appc CLI to download connectors from Appcelerator cloud.  Now, API Builder will load all of its components from npm node modules.  A 12-factor app needs to [explicitly declare and isolate dependencies](https://12factor.net/dependencies).  The node modules are **plugins** for API Builder, and can extend functionality, such as adding data connectors, or flow-nodes to the flow editor.  Later, we will add plugins for flow-nodes that can connect out to additional services, such as SalesForce.

Also note that we are porting legacy data connectors to plugins on an as-needed basis.  To date, we have:

* @axway/api-builder-plugin-dc-mongo
* @axway/api-builder-plugin-dc-mysql
* @axway/api-builder-plugin-dc-oracle

### HTTP REST client flow-node

API Builder now has a new flow-node that can connect out to external services asynchronously via HTTP.

![REST flow-node](./images/rest-client.png)

### Swagger flow-node

API Builder now has a new flow-node that can load Swagger 2.0 documents as flow-nodes and make them available to the flow editor.  This greatly simplifies orchestrating east-west communication to sibling services in a service mesh.

![Swagger flow-node](./images/swagger-flow-node.png)

## Getting Started

### Installation

We recommend you use `npm` install api-builder CLI globally:

```
[sudo] npm install -g @axway/api-builder
```

Alternatively, you can use `npx` to ensure you are using the latest, but do not mix npm and npx - use one or the other:

```
npx @axway/api-builder init myapp
```

:warning: **Warning**: that if you have been following API Builder through technical preview, we strongly advise you to uninstall and clean your npm cache and ensure you do not have api-builder somewhere else on your path:
```
$ [sudo] npm uninstall @axway/api-builder -g
$ npm clean cache --force
$ which api-builder
```


### Start a new project

```
api-builder init myapp
cd myapp
npm install --no-optional
npm start
```

Then navigate to: http://localhost:8080/console

### Install a plugin dependency

```
npm install --save @axway/api-builder-plugin-dc-oracle
npm install --save @axway/api-builder-plugin-dc-mysql
npm install --save @axway/api-builder-plugin-dc-mongo
```

### Custom flow-node plugins

The ability to create custom robust, reusable, and pluggable flow-nodes is an important aspect to API Builder.  In this version of the product, they are now plugins and loaded from node_modules.  Use the [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk) to create custom plugins.
