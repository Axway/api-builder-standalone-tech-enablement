# API Builder Standalone - What's new

* Revised logging format to write to stdout be amenable to 12-factor application to [treat logs as event streams](https://12factor.net/logs)
* Revised configuration to be amenable to 12-factor application to [store configuration in the environment](https://12factor.net/config), and to make configurable containers, e.g. [port binding](https://12factor.net/port-binding), and to [keep environments as similar as possible](https://12factor.net/dev-prod-parity).
* No dependency to appc
* New CLI (api-builder)
* Changes to load data connectors as npm modules to be amenable to 12-factor application to [explicitly declare and isolate dependencies](https://12factor.net/dependencies)
* Plugin architecture
* Added new asynchronous HTTP rest client plugin to the flow
* Added new asynchronous Swagger plugin to the flow
* Flows now have input parameters and autocomplete

## Logging

Previously, API Builder wrote to a logs directory.  Now, it only streams to stdout.

## Configuration

Previously, API Builder had specific configuration files per-environment.  A 12-factor application should be environment agnostic.  Now, API Builder has greatly simplified it with two sets of configuration files called `default` and `local`.  
a single set of configuration files called `*default.js`.

