#!/bin/bash

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
    echo "Cleanup"
    docker-compose -f docker-compose-services.yaml down
    docker-compose -f docker-compose-db.yaml down
}

docker-compose -f docker-compose-db.yaml up -d
sleep 60
docker-compose -f docker-compose-services.yaml up -d
docker-compose -f docker-compose-services.yaml logs -f

