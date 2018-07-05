module.exports = `![Banner](/static/images/banner.png)
# How to create API Builder Microservice

## Introduction
> The goal of this section will walk you through the process of how to create and initialize new __API Builder Microservice__ using the **_API Builder CLI_**.
 
## Documentation and resources

* [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) - Provides detailed instructions for installing API Builder and creating an API Builder project.
* [API Builder Project](https://wiki.appcelerator.org/display/AB4/API+Builder+Project) - Provides detailed information about API Builder projects and services.
* [Axway Appcelerator Youtube Channel](https://www.youtube.com/watch?v=lgPFasrGATE) - Youtube channed where you could find Demo series and more interesting videos & tutorials
* [Appcelerator Blog](https://www.appcelerator.com/blog/) - Axway blog space.

### Prerequisites

You should have \`NPM\` latest version and \`Node.js\` latest version (^8) installed.
Tools to be installed in advance:

* Install the __API Builder Command Line Interface (CLI)__ globally using \`npm\`. It is a node module published in npm public repository, please find additional information on official API Builder Getting Started Guide.
* __Docker__ - The installation of Docker depends on the specific operating system, please read the details on the following page Read the official guide for Docker installation.
Research for the B.I tools and 3rd party data store i.e. Splunk, Elastic etc.

### How to create own API Builder Service
> The generation of API Builder services is a simple process with the help of the API Builder CLI tool.

#### Setup
Install the **API Builder Command Line Interface _(CLI)_** globally using \`npm\`.

\`\`\`sh
[sudo] npm install -g @axway/api-builder
\`\`\`

#### Create project
Once API Builder CLI is installed, you can use it to create a new project.  In the following example, the CLI will create and initialize the \`./<dir>\` new project directory.

\`\`\`sh
api-builder init <dir>
\`\`\`

#### Run the Microservice
Then, install the project's dependencies and start the API Builder project.

\`\`\`sh
cd ./<dir>
npm install --no-optional
npm start
\`\`\`
![API Builder Init](./images/api-builder-init.png)

> Once your project is running, point your browser to http://localhost:8080/console to access the API Builder user interface (UI) console.

__NOTE:__ Refer to the [API Builder Getting Started Guide](https://wiki.appcelerator.org/display/AB4/API+Builder+Getting+Started+Guide) for detailed information.

#### CLI commands

| 		Command    		| 			Arguments                              	| 			  Description           |
|:---------------------|:----------------------------------------------------|:---------------------------------|
| \`[sudo] npm install -g @axway/api-builder\` | \`@axway/api-builder\` - The API Builder Command Line Interface _(CLI)_ package. | Install the **API Builder Command Line Interface _(CLI)_** globally using \`npm\`. |
| \`api-builder init <dir>\` | \`<dir>\` - The directory to initialize. | Creates and initializes a new API Builder project by creating the project in a directory specified by dir. The command will fail if the directory exists or if the command is run within an API Builder project directory. |
| \`npm install --no-optional\` | The \`--no-optional\` argument will prevent optional dependencies from being installed. | Install the project's dependencies. |
| \`npm start\` | Entrypoint of the starting script: \`node .\` | Run the API Builder Microservice. |

## See API Builder Services in Action

The API Builder Data Connectors can be seen in action in [api-builder-standalone-tech-enablement](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project)

#### Internal Services (other API Builder Services)
* **[Product Service](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project/product-service)** - used to collect the Product Details.
* **[Review Service](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project/review-service)** - used to collect the Reviews for Product.
* **[Product Review Service](https://github.com/Axway/api-builder-standalone-tech-enablement/tree/master/project/product-review-service)** - used for searching a product by SKU and aggregate information about product details, reviews, and the most relevant categories it fits in according to its description.
`