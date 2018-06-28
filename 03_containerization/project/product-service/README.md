# Product Service

## Table of content
*	[Dockerize the API Builder Service](#dockerize-the-api-builder-service)

## Dockerize the API Builder Service
API Builder applications come with a with an example Docker file. When a service is generated with the API Builder CLI, the generated service has Docker file in its root directory.

This file is just one possible Docker file that can be used for the Docker image creation. You can tailor the Docker file to your specific needs.

* The Docker image can be created with the following command:
```sh
docker build -t <IMAGE_NAME> ./
```

* Now, you can run as many containers as you want out of the created Docker image. To check for the presence of the newly created image, run the following command:
```sh
docker image ls
```

### API Builder Environment Variables
The docker image can be configured at runtime via environment variables. This is a list of the common variables that you will need to set to use this image.

| Name                 | Description                                         | Default                          | Options                   |
|:---------------------|:----------------------------------------------------|:---------------------------------|:--------------------------|
| APIKEY         | The API key for incoming requests to the service    | Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3 |                    |
| NEWSAPI_APIKEY | The NewsApi.org API key which provides the content. |                                  | Signup at [https://newsapi.org](https://newsapi.org) | 
| PORT                 | The port the service will be listening on.          | 8080                             | |
| LOGLEVEL       | Logging level to use                                | debug                            | debug, trace, info, error |
| MYSQL_USER	| The MySql user 									| root									| |
| MYSQL_PASSWORD | The MySql password								| password 								| |


* Navigate to the `<your-project>/conf/mysql.default.js` and change the `host` to the `<container-name` in this case: `mysql-container`
```js
module.exports = {
	connectors: {
		mysql: {
			connector: '@axway/api-builder-plugin-dc-mysql',
			connectionPooling: true,
			connectionLimit: 10,
      		host: 'mysql-container',
			port: 3306,
			database: 'productdb',
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,

			// Create models based on your schema that can be used in your API.
			generateModelsFromSchema: true,

			// Whether or not to generate APIs based on the methods in generated models.
			modelAutogen: false
		}
	}
};
```

* Run the docker container via the already builded `<IMAGE_NAME>`. Set the Env Variables with the `-e` prefix i.e. `-e MYSQL_PASSWORD=password` and need to link the service container to the DB container using `--link` prefix i.e. `--link mysql-container:mysql-container`

```sh
docker run --name service-container -e MYSQL_USER=root -e MYSQL_PASSWORD=password --link mysql-container:mysql-container -p 8080:8080 service-img
```