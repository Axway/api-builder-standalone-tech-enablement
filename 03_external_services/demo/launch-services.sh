#!/bin/bash

# trap ctrl-c and call ctrl_c()
trap ctrl_c INT

function ctrl_c() {
    echo "Cleanup"
    docker-compose down
}

docker-compose up -d
docker-compose logs -f
