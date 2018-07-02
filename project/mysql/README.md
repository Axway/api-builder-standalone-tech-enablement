# MySql container with DB
> This is setup MySql container with DB

## Docker Build
Once you have already clone the repository and navigate to the `mysql` folder, you will be able to build your own MySql Image from the provided `Dockerfile`, please use the following command:
```sh
docker build -t <mysql-img> ./
```

## API Builder Environment Variables
The docker image can be configured at runtime via environment variables. This is a list of the common variables that you will need to set to use this image.

| Name                 | Description                                         | Default                          |
|:---------------------|:----------------------------------------------------|:---------------------------------|
| MYSQL_DATABASE	| The name of the DB.		| productdb |
| MYSQL_USER         | The variable set for MySql user.    | apibuilder |
| MYSQL_PASSWORD | The variable set that user's password. |  apibuilder |
| MYSQL_ROOT_PASSWORD | This variable is mandatory and specifies the password that will be set for the MySQL root superuser account.          |-u `root` -p `password` |

### Running the image

Standard run

```sh
docker run -p 3306:3306 --name <mysql-container-name> -e MYSQL_ROOT_PASSWORD=<your-password> -d <mysql-img>
```

Or with additional environment overrides. 

```sh
docker run -p 3306:3306 --name <mysql-container-name> -e MYSQL_USER=<your-user> -e MYSQL_PASSWORD=<your-password> -d <mysql-img>
```

### Testing the DB

```sh
docker exec -it <mysql-container-name> mysql -uroot -ppassword
```
