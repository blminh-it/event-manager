#!/bin/bash
# set -e

function debug() {
  echo -e "$1"
}
function info() {
  echo -e "\033[0;34m$1\033[0m"
}
function error() {
  echo -e "\033[0;31m$1\033[0m"
}
function success() {
  echo -e "\033[0;32m$1\033[0m"
}


# ***** Main logic *****
# if [[ "$(id -u)" -ne 0 ]]; then error "Please run $0 as root user" >&2; exit 1; fi
set -a && source .env && set +a

docker-compose -f 03-docker-compose-public-gateway.yml -p event-manager down
docker-compose -f 02-docker-compose-services.yml -p event-manager down
docker-compose -f 01-docker-compose-3rd-parties.yml -p event-manager down
