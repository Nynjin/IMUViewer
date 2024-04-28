#!/bin/bash

init_dir=$(dirname "$0")

default() {

    # Check if env file exists
    if [ ! -f .env ]; then
        echo "No .env file found"
        echo "Usage: $0 {dev | build | start}"
        exit 1
    fi
        
    source .env

    # Check if default mode is set
    if [ -z "$DEFAULT_MODE" ]; then
        echo "No default mode set in .env file"
        echo "Usage: $0 {dev | build | start}"
        exit 1
    fi

    docker compose -f "$init_dir/docker-compose.$DEFAULT_ENV.yml" build --build-arg MODE="$DEFAULT_MODE"
    docker compose -f "$init_dir/docker-compose.$DEFAULT_ENV.yml" up 
    exit 0
}

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Incorrect number of arguments. Using default config..."
    default
fi

# Validate $1 (env) - should be "dev" or "prod"
if [ "$1" != "DEV" ] && [ "$1" != "PROD" ]; then
    echo "Error: Invalid environment. Use 'DEV' or 'PROD'."
    echo "Using default config..."
    default
fi

# Validate $2 (mode) - should be "install", "test", "build", "execute" or "clean"
if [ "$2" != "dev" ] && [ "$2" != "build" ] && [ "$2" != "start" ]; then
    echo "Error: Invalid mode. Use 'dev', 'build' or 'start'."
    echo "Using default config..."
    default
fi

# If parameters are correct, proceed with Docker Compose commands
docker compose -f "$init_dir/docker-compose.$1.yml" build --build-arg MODE="$2"
docker compose -f "$init_dir/docker-compose.$1.yml" up
exit 0