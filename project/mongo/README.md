# Mongo container with DB
> This is setup Mongo container with DB
## Dependencies

You need a docker installed on your machine

## Docker Build
Once you have already clone the repository and navigate to the `mongo` folder, you will be able to build your own Mongo Image from the provided `Dockerfile`, please use the following command:
```sh
docker build -t mongodb ./
```

## API Builder Environment Variables
The docker image can be configured at runtime via environment variables. This is a list of the common variables that you will need to set to use this image.

| Name                 | Description                                         | Default                          |
|:---------------------|:----------------------------------------------------|:---------------------------------|
| MONGO_INITDB_ROOT_USERNAME         | The variable set for Mongo user.    | apibuilder |
| MONGO_INITDB_ROOT_PASSWORD | The variable set that user's password. |  apibuilder |
| MONGO_INITDB_DATABASE	| The name of the DB.		| admin |

### Running the image

Standard run

```sh
docker run -d --name myMongoDB mongodb
```

### Testing the DB

```sh
docker run -it --rm --link myMongoDB:mongodb mongo mongo --host myMongoDB -u apibuilder -p apibuilder --authenticationDatabase admin
```
