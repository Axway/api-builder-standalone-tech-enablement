# API Builder Standalone - What's new

* No dependency to appc
* New CLI (@axway/api-builder)
* Revised logging format to stream to stdout
* Revised configuration to have only `default` and `local` sets of configuration files
* Changes to load data connectors as npm modules (plugins)
* Added new asynchronous HTTP rest client plugin to the flow
* Added new asynchronous Swagger plugin to the flow
* Flows now have input parameters and autocomplete

## Standalone

API Builder is now standalone and no longer requires `appc`, or the Appcelerator cloud.  API Builder is a **free** NodeJS / ExpressJS application to help companies rapidly build microservices using reusable components, and then build these services into containers to deploy into any container platform.  API Builder is not a container itself.

## Logging

Previously, API Builder wrote to a logs directory.  Now, it only streams to stdout.  To be amenable to 12-factor application to [treat logs as event streams](https://12factor.net/logs), applications should not log to file.

## Configuration

Previously, API Builder had specific configuration files per-environment.  Now, API Builder has simplified configuration with two sets of configuration files called `default` and `local`.  A 12-factor application should be [environment agnostic](https://12factor.net/config) so the environment specific configuration sets (e.g. `production` were removed).  Furthermore, the recommended way to [keep environments as similar as possible](https://12factor.net/dev-prod-parity), is to use OS environment variables (i.e. `process.env`), e.g. for [port binding](https://12factor.net/port-binding), authentication settings, remote host settings, etc.

## Connectors

Previously, API Builder needed appc CLI to download connectors from Appcelerator cloud.  Now, API Builder will load all of its components from npm node modules.  A 12-factor app needs to [explicitly declare and isolate dependencies](https://12factor.net/dependencies).  The node modules are **plugins** for API Builder, and can extend functionality, such as adding data connectors, or flow-nodes to the flow editor.  Later, we will add plugins for flow-nodes that can connect out to additional services, such as SalesForce.

## HTTP REST client flow-node

API Builder now has a new flow-node that can connect out to external services asynchronously via HTTP.

![REST flow-node](/00_whats_new/images/rest-client.png)

## Swagger flow-node

API Builder now has a new flow-node that can load Swagger 2.0 documents as flow-nodes and make them available to the flow editor.  This greatly simplifies orchestrating east-west communication to sibling services in a service mesh.

![Swagger flow-node](/00_whats_new/images/swagger-flow-node.png)

## Flows have autocomplete

Flows now describe their inputs.  It is a first step to making flows reusable components.  For the most part, this change is transparent to the user.  The flow editor now has autocomplete for a limited set of inputs.
