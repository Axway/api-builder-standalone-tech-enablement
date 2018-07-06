module.exports =`![Banner](/static/images/banner.png)
# Demo Setup

In this chapter we are presenting how to prepare for the demo.
Essentially you will need:

* Running MySQL - for Products Database. If you don't have MySQL [read how you can spin up one with Docker](../projects/mysql).
* Running MongoDB - for Reviews Database. If you don't have MongoDB [read how you can spin up one with Docker](../projects/mongodb)
* API Key for [Parallel Dots API](http://paralleldots.com) - for collection of Taxonomy data based on Product description.
* To scafold several API Builder services with the new CLI
* Installing the data connectors for MySQL and MongoDB and Swagger flow-node plugin for accessing the third party API

Knowing how to create API Builder service initially is essential so see the next section.

## How to Create API Builder service and install plugins?

We recommend you use \`npm\` install api-builder CLI globally:

\`\`\`
[sudo] npm install -g @axway/api-builder
\`\`\`

Alternatively, you can use \`npx\` to ensure you are using the latest, but do not mix npm and npx - use one or the other:

\`\`\`
npx @axway/api-builder init myapp
\`\`\`

:warning: **Warning**: that if you have been following API Builder through technical preview, we strongly advise you to uninstall and clean your npm cache and ensure you do not have api-builder somewhere else on your path:
\`\`\`
$ [sudo] npm uninstall @axway/api-builder -g
$ npm clean cache --force
$ which api-builder
\`\`\`

### Start a new project

\`\`\`
api-builder init myapp
cd myapp
npm install --no-optional
npm start
\`\`\`

Then navigate to: http://localhost:8080/console

### Install a plugin dependency

\`\`\`
npm install --save @axway/api-builder-plugin-dc-oracle
npm install --save @axway/api-builder-plugin-dc-mysql
npm install --save @axway/api-builder-plugin-dc-mongo
\`\`\`

### Configure a plugin dependency

After the installation of a plugin check the \`./conf\` folder in your project to find the generated configuration file and put the proper configuration optuons.
`