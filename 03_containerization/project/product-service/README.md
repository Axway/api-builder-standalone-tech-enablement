# Product Service

## Table of content
*	[Dockerize the API Builder Service](#dockerize-the-api-builder-service)
	* [API Builder Environment Variables](#api-builder-environment-variables)
	* [Configure your Service](#configure-your-service)

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

* Run the docker container via the already builded `<IMAGE_NAME>`. Set the Env Variables with the `-e` prefix i.e. `-e MYSQL_PASSWORD=password` and need to link the service container to the DB container using `--link` prefix i.e. `--link mysql-container:mysql-container`

```sh
docker run --name service-container -e MYSQL_USER=root -e MYSQL_PASSWORD=password --link mysql-container:mysql-container -p 8080:8080 service-img
```

Once your project is running, point your browser to http://localhost:8080 to access the API Builder user interface. You won't be able to reach the UI console, because when run the Service in Docker Container it was runned in `--production` mode i.e. Production Environment.

* You could list all available/running containers via:
```sh
// List all available containers
docker ps -a

// List all running containers
docker ps
```

* You could start/stop the container via the Container ID
```sh
docker start/stop <container-ID>
```

* Now, you could execute `curl` command to be sure that the service is running successfully, the DB is reached and return real data. Set up the `apikey` from the `conf/default.js` and path to the endpoint.

```sh
curl -u jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X http://localhost:8080/api/endpoints/products
```

__NOTE:__ if you haven't any records in the DB yet, the response will be empty array i.e. `[]`

### API Builder Environment Variables
The docker image can be configured at runtime via environment variables. This is a list of the common variables that you will need to set to use this image.

| Name                 | Description                                         | Default                          | Options                   |
|:---------------------|:----------------------------------------------------|:---------------------------------|:--------------------------|
| APIKEY         | The API key for incoming requests to the service    | Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3 |                    |
| NEWSAPI_APIKEY | The NewsApi.org API key which provides the content. |                                  | Signup at [https://newsapi.org](https://newsapi.org) | 
| PORT                 | The port the service will be listening on.          | 8080                             | |
| LOGLEVEL       | Logging level to use                                | debug                            | debug, trace, info, error |


### Configure your own Service
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