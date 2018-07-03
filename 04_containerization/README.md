# Dockerize an application

## Table of content

*	[Set up your Docker environment](#set-up-your-docker-environment)
*	[Build an image and run it as one container](#build-an-image-and-run-it-as-one-container)
*	[Scale your app to run multiple containers](#scale-your-app-to-run-multiple-containers)

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

## Scale your app to run multiple containers

#### Prerequisites
* [Docker](https://docs.docker.com/install/).
* [Docker Compose](https://docs.docker.com/compose/overview/).
* [Docker Machine](https://docs.docker.com/machine/overview/).
* [Kubernetes](https://docs.docker.com/docker-for-mac/kubernetes/).

__NOTE__: Kubernetes is only available in Docker for Mac 17.12 CE and higher, on the Edge channel. Kubernetes support is not included in Docker for Mac Stable releases. To find out more about Stable and Edge channels and how to switch between them, see [General configuration](https://docs.docker.com/docker-for-mac/kubernetes/#general).

In a distributed application, different pieces of the app are called “services.” For example, if you imagine a video sharing site, it probably includes a service for storing application data in a database, a service for video transcoding in the background after a user uploads something, a service for the front-end, and so on.

Services are really just “containers in production.” A service only runs one image, but it codifies the way that image runs—what ports it should use, how many replicas of the container should run so the service has the capacity it needs, and so on. Scaling a service changes the number of container instances running that piece of software, assigning more computing resources to the service in the process.

Luckily it’s very easy to define, run, and scale services with the Docker platform -- just write a __docker-compose.yml__ file.
```sh
docker-compose.yml
```
```sh
version: "3"
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repo:tag
    deploy:
      replicas: 5
      resources:
        limits:
          cpus: "0.1"
          memory: 50M
      restart_policy:
        condition: on-failure
    ports:
      - "8080:80"
    networks:
      - webnet
networks:
  webnet:
```

This docker-compose.yml file tells Docker to do the following:

* Pull the image we uploaded in step 2 from the registry.

* Run 5 instances of that image as a service called web, limiting each one to use, at most, 10% of the CPU (across all cores), and 50MB of RAM.

* Immediately restart containers if one fails.

* Map port 8080 on the host to web’s port 80.

* Instruct web’s containers to share port 80 via a load-balanced network called webnet. (Internally, the containers themselves publish to web’s port 80 at an ephemeral port.)

* Define the webnet network with the default settings (which is a load-balanced overlay network).

__NOTE:__ This __.yml__ file is prety simple and it's not exposing all the functionality/complexity that can be added in the configs like connecting to a database,services,clusters and etc. For more details visit the official documentation [Docker Hub Get Started](https://docs.docker.com/get-started/)

#### 1.Run your new load-balanced app and scale it
You can deploy a stack on Kubernetes with docker stack deploy, the docker-compose.yml file, and the name of the stack.
```sh
docker stack deploy --compose-file /path/to/docker-compose.yml apibuilderapp
docker stack services apibuilderapp
```
You can see the service deployed with the kubectl get services command.
#### 2.Specify a namespace
By default, the default namespace is used. You can specify a namespace with the --namespace flag.
```sh
docker stack deploy --namespace my-app --compose-file /path/to/docker-compose.yml apibuilderapp
```
Run ``` kubectl get services -n my-app``` to see only the services deployed in the my-app namespace.

__NOTE__:Note: Deploying the same app in Kubernetes and swarm mode may lead to conflicts with ports and service names.

The mac __Kubernetes__ integration provides the Kubernetes CLI command at __/usr/local/bin/kubectl__. This location may not be in your shell’s PATH variable, so you may need to type the full path of the command or add it to the PATH. For more information about kubectl, see the __kubectl__ [official documentation](https://kubernetes.io/docs/reference/kubectl/overview/). You can test the command by listing the available nodes: