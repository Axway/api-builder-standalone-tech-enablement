# This document provides a step-by-step tutorial on how to run mongoDB > 3.6 via Docker
### Prerequisites

Install latest version of Docker

## Steps
#### Clone this repo and navigate to the folder ./01_demo_setup/project/mongo and run in the terminal:

1. Setup your config file for api-builder-plugin-dc-mongo connector to look like this:


```
docker build -t mongodb ./
```
```
docker run -d --name myMongoDB mongodb
```
Access the database from the terminal
```
docker run -it --rm --link myMongoDB:mongodb mongo mongo --host myMongoDB -u root -p password --authenticationDatabase admin
```
