# Product Service

## Table of content
*	[Dockerize the API Builder Service](#dockerize-the-api-builder-service)

### Prerequisites

`You need a running mongoDB container!!!`

Start with the steps described in ./01_demo_setup/project/mongo/README.md

## Dockerize the API Builder Service
API Builder applications come with a with an example Docker file. When a service is generated with the API Builder CLI, the generated service has Docker file in its root directory.

This file is just one possible Docker file that can be used for the Docker image creation. You can tailor the Docker file to your specific needs.

* The Docker image can be created with the following command:
```sh
docker build -t review-service ./
```

* Now, you can run as many containers as you want out of the created Docker image. To check for the presence of the newly created image, run the following command:
```sh
docker image ls
```

### API Builder Environment Variables
The docker image can be configured at runtime via environment variables. This is a list of the common variables that you will need to set to use this image.

| Name                 | Description                                         | Default                          | Options                   |
|:---------------------|:----------------------------------------------------|:---------------------------------|:--------------------------|
| APIKEY         | The API key for incoming requests to the service    | CI5Uaei7o3AqI/J85trGCkYEjY/R7Q0v |                    |
| NEWSAPI_APIKEY | The NewsApi.org API key which provides the content. |                                  | Signup at [https://newsapi.org](https://newsapi.org) | 
| PORT                 | The port the service will be listening on.          | 8080                             | |
| LOGLEVEL       | Logging level to use                                | debug                            | debug, trace, info, error |
| MONGO_INITDB_ROOT_USERNAME	| The Mongo user 									| root									| |
| MONGO_INITDB_ROOT_PASSWORD | The Mongo password								| password 								| |
| DBLINK | The Mongo host								| myMongoDB:27017/admin 								| |


* Navigate to the `<your-project>/conf/mongo.default.js` and add the config below:
```js
module.exports = {
	connectors: {
		mongo: {
			connector: '@axway/api-builder-plugin-dc-mongo',
			url: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DBLINK}`,
			
			// Create models based on the schema that can be used in your API.
			//
			// Use this with care, API Builder determines the schema for the auto generated
			// models by sampling the collection. If the collection is empty then the schema
			// cannot be determined and so the model will not be generated.
			// This will cause issues if there are Flows/APIs depending on that model schema.
			// Instead you should prefer explicitly creating Models in the API Builder UI.
			generateModelsFromSchema: true,

			// Whether or not to generate APIs based on the methods in generated models.
			modelAutogen: true
		}
	}
};
```

* Run the docker container via the already builded `review-service`. Set the Env Variables with the `-e` prefix i.e. `-e MONGO_INITDB_ROOT_USERNAME=root` and need to link the service container to the DB container using `--link` prefix i.e. `--link myMongoDB`

```sh
docker run --name myApp --link myMongoDB -p 8080:8080 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password -e DBLINK=myMongoDB:27017/admin -d review-service
```

* Now, you could execute `curl` command to be sure that the service is running successfully, the DB is reached and return real data. Set up the `apikey` from the `conf/default.js` and path to the endpoint.

```sh
curl -u CI5Uaei7o3AqI/J85trGCkYEjY/R7Q0v http://localhost:8080/api/mongo/review
```

__NOTE:__ if you haven't any records in the DB yet, the response will be empty array i.e. `[]`