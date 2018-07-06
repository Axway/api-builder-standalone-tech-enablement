# What is New?

## Headlines

1. Removed dependency to appc and introduced a new CLI (@axway/api-builder)

2. Introduced new plugin architecture leveraging npm modules:
* Data connectors are installed as npm modules (plugins)
* Service connectors are installed as npm modules (plugins)
* Flow-nodes are installed as npm modules (plugins)

3. Custom flow-node plugins with input parameters and autocomplete

* Added new asynchronous HTTP rest client plugin to the flow
* Added new asynchronous Swagger plugin to the flow

4. Revised logging format to stream to stdout
5. Revised configuration to have only `default` and `local` sets of configuration files

### Standalone

API Builder is now standalone and no longer requires `appc`, or the Appcelerator cloud.  API Builder is a **free** NodeJS / ExpressJS application to help companies rapidly build microservices using reusable components, and then build these services into containers to deploy into any container platform.  API Builder is not a container itself.

### Plugin Architecture

Previously, API Builder needed appc CLI to download connectors from Appcelerator cloud.  Now, API Builder will load all of its components from npm node modules.  A 12-factor app needs to [explicitly declare and isolate dependencies](https://12factor.net/dependencies).  The node modules are **plugins** for API Builder, and can extend functionality, such as adding data connectors, or flow-nodes to the flow editor.  Later, we will add plugins for flow-nodes that can connect out to additional services, such as SalesForce.

Also note that we are porting legacy data connectors to plugins on an as-needed basis.  To date, we have:

* @axway/api-builder-plugin-dc-mongo
* @axway/api-builder-plugin-dc-mysql
* @axway/api-builder-plugin-dc-oracle

### Custom flow-node plugins

The ability to create custom robust, reusable, and pluggable flow-nodes is an important aspect to API Builder.  In this version of the product, they are now plugins and loaded from node_modules.  Use the [axway-flow-sdk](https://www.npmjs.com/package/axway-flow-sdk) to create custom plugins.

#### HTTP REST client flow-node

API Builder now has a new flow-node that can connect out to external services asynchronously via HTTP.

![REST flow-node](./images/rest-client.png)

#### Swagger flow-node

API Builder now has a new flow-node that can load Swagger 2.0 documents as flow-nodes and make them available to the flow editor.  This greatly simplifies orchestrating east-west communication to sibling services in a service mesh.

![Swagger flow-node](./images/swagger-flow-node.png)

### Logging

Previously, API Builder wrote to a logs directory.  Now, it only streams to stdout.  To be amenable to 12-factor application to [treat logs as event streams](https://12factor.net/logs), applications should not log to file.

### Configuration

Previously, API Builder had specific configuration files per-environment.  Now, API Builder has simplified configuration with two sets of configuration files called `default` and `local`.  A 12-factor application should be [environment agnostic](https://12factor.net/config) so the environment specific configuration sets (e.g. `production` were removed).  Furthermore, the recommended way to [keep environments as similar as possible](https://12factor.net/dev-prod-parity), is to use OS environment variables (i.e. `process.env`), e.g. for [port binding](https://12factor.net/port-binding), authentication settings, remote host settings, etc.

### Reading Next

[Chapter 01. Demo Setup](../01_demo_setup)

[Chapter 02. Create Microservice from a Database](../02_mircoservice_from_db)

[Chapter 03. Consume External Services](../03_external_services)

[Chapter 04. Containerization](../04_containerization)

[Chapter 05. Scalable Deployments (with Kubernetes)](../05_kubernetes)