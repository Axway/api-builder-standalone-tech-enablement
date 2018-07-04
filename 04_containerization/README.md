# Dockerize an application

## Table of content

*	[Set up your Docker environment](#set-up-your-docker-environment)
*	[Build an image and run it as one container](#build-an-image-and-run-it-as-one-container)

## Set up your environment

* Install a [maintained version](https://docs.docker.com/install/) of Docker Community Edition (CE) or Enterprise Edition (EE) on a [supported platform](https://docs.docker.com/install/).

#### Test Docker version
1. Run __docker --version__ and ensure that you have a supported version of Docker:
```sh
docker --version

Docker version 17.12.0-ce, build c97c6d6
```
> To avoid permission errors (and the use of __sudo__), add your user to the docker group. [Read more](https://docs.docker.com/install/linux/linux-postinstall/).

2. Run docker info or (docker version without --) to view even more details about your docker installation:

```sh
docker info

Containers: 0
 Running: 0
 Paused: 0
 Stopped: 0
Images: 0
Server Version: 17.12.0-ce
Storage Driver: overlay2
...
```

### Recap and cheat sheet

```sh
## List Docker CLI commands
docker
docker container --help

## Display Docker version and info
docker --version
docker version
docker info

## Execute Docker image
docker run apibuilder-app

## List Docker images
docker image ls

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq
```
### Conclusion 
Containerization makes [CI/CD](https://www.docker.com/use-cases/cicd) seamless. For example:
* applications have no system dependencies
* updates can be pushed to any part of a distributed application
* resource density can be optimized.

With Docker, scaling your application is a matter of spinning up new executables, not running heavy VM hosts.

## Build an image and run it as one container
#### Define a container with Dockerfile

__Dockerfile__ defines what goes on in the environment inside your container. Access to resources like networking interfaces and disk drives is virtualized inside this environment, which is isolated from the rest of your system, so you need to map ports to the outside world, and be specific about what files you want to “copy in” to that environment. However, after doing that, you can expect that the build of your app defined in this __Dockerfile__ behaves exactly the same wherever it runs.

#### 1.Dockerfile Example
```sh
# Use an official Mongo database as a parent image
FROM mongo

# Define environment variable
ENV MONGO_INITDB_ROOT_USERNAME=apibuilder
ENV MONGO_INITDB_ROOT_PASSWORD=apibuilder
ENV MONGO_INITDB_DATABASE=admin

# Copy the current directory file contents into the container at /docker-entrypoint-initdb.d/ it will source any *.sh or *.js files found in that directory [/docker-entrypoint-initdb.d] to do further initialization before starting the service
COPY initMyDatabase.js /docker-entrypoint-initdb.d/

# Run mongod when the container launches
CMD ["docker-entrypoint.sh", "mongod"]
```

#### 2.Build the container
Execute the following command:
```sh
docker build -t <image_name> ./
## Execute Docker image
docker run --name <container_name> -d <image_name>
```

__NOTE:__ To run an actual code example check the content in:
*  ./project/mongo or ./project/mysql for a personalized DB image
*  ./project/product-service or ./project/review-service for a personalized API Builder image 

__That’s it!__ You don’t need Mongo Database on your system, nor does building or running this image install them on your system. It doesn’t seem like you’ve really set up an environment with Mongo, but you have one.

#### 3.Share your image
To demonstrate the portability of what we just created, let’s upload our built image and run it somewhere else. After all, you need to know how to push to registries when you want to deploy containers to production.

A registry is a collection of repositories, and a repository is a collection of images—sort of like a GitHub repository, except the code is already built. An account on a registry can create many repositories. The docker CLI uses Docker’s public registry by default.

> Note: We use Docker’s public registry here just because it’s free and pre-configured, but there are many public ones to choose from, and you can even set up your own private registry using Docker [Trusted Registry](https://docs.docker.com/datacenter/dtr/2.2/guides/).

##### a. Log in with your Docker ID
If you don’t have a Docker account, sign up for one at hub.docker.com. Make note of your username.

Log in to the Docker public registry on your local machine.
```sh
docker login
```
##### b. Tag the image

The notation for associating a local image with a repository on a registry is __username/repository:tag__. The tag is optional, but recommended, since it is the mechanism that registries use to give Docker images a version. Give the repository and tag meaningful names for the context, such as api-builder:part2. This puts the image in the api-builder repository and tag it as part2.

Now, put it all together to tag the image. Run docker tag image with your username, repository, and tag names so that the image uploads to your desired destination. The syntax of the command is:

```sh
docker tag image username/repository:tag
```
For example:

```sh
docker tag apibuilderapp john/api-builder:part2
```

Run docker image ls to see your newly tagged image.

```sh
$ docker image ls

REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
john/api-builder         part2               d9e555c53008        3 minutes ago       195MB
python                   2.7-slim            1c7128a655f6        5 days ago          183MB
...
```
##### c. Publish the image

Upload your tagged image to the repository:

```sh
docker push username/repository:tag
```

Once complete, the results of this upload are publicly available. If you log in to [Docker Hub](https://hub.docker.com/), you see the new image there, with its pull command.

##### d. Pull and run the image from the remote repository

From now on, you can use docker run and run your app on any machine with this command:

```sh
docker run -p 8080:80 username/repository:tag
```

If the image isn’t available locally on the machine, Docker pulls it from the repository.

```sh
$ docker run -p 8080:80 john/api-builder:part2
Unable to find image 'john/api-builder' locally
part2: Pulling from john/api-builder
10a267c67f42: Already exists
f68a39a6a5e4: Already exists
9beaffc0cf19: Already exists
3c1fe835fb6b: Already exists
4c9f1fa8fcb8: Already exists
ee7d8f576a14: Already exists
fbccdcced46e: Already exists
Digest: sha256:0601c866aab2adcc6498200efd0f754037e909e5fd42069adeff72d1e2439068
Status: Downloaded newer image for john/api-builder:part2
 * Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
```
No matter where docker run executes, it pulls your image, along with all the dependencies and runs your code. It all travels together in a neat little package, and you don’t need to install anything on the host machine for Docker to run it.
