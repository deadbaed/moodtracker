#!/usr/bin/env just --justfile

docker_image := "mood-tracker"

# list recipes
default:
  just --list

# build docker image
docker_build:
  docker build -t {{docker_image}} .

# run docker image
docker_run: docker_build
  docker run --rm -p 8005:80 {{docker_image}}
