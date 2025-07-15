#!/bin/bash
# set +e
# set -o xtrace

baseDir=$(pwd)
adminPassword=1234567890x@X # Default password for admin user
adminEmail=admin@event.local

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

function migrateBackendDbSchema() {
  info " * Migrate backend database schema"
  docker exec -it backend sh -c "cd /home/node/app && yarn run migration:run"
  success "   > Database schema migrated"
}


# ***** Main logic *****
if [[ "$(id -u)" -ne 0 ]]; then error "Please run $0 as root user" >&2; exit 1; fi

# Setup _data dir
normalUser=$USER
mkdir -p _data/nginx
mkdir -p _data/postgres/data
sudo chown -R ${normalUser} _data

# Set the environment variables from .env file
info " * Setup environment variables"
debug "   + $(pwd)/.env"
if [[ ! -f ".env" ]]; then
    read -p "   > No .env file found. Confirm you have set up the above .env file (y/N): " answ
    if [[ "${answ}" != "y" ]] && [[ "${answ}" != "Y" ]]; then
        error "   > User aborted"
        exit 1
    fi
fi
set -a && source .env && set +a

# Create the Docker network to get the gateway IP
info " * Setup Docker network"
tmpRes=$(docker network ls | grep event_manager_network)
if [[ $? == 0 ]]; then
    debug "   > Network already existed"
else
    docker network create -d bridge event_manager_network
    debug "   > Network created"
fi

# Inject the environment variables to the postgres_init.sql
info " * Deploy 3rd-party services"
cp ../postgres/postgres_init.sql.example _data/postgres/postgres_init.sql
sed -i "s/@EVENT_MANAGER_POSTGRES_USER_PASSWORD/${EVENT_MANAGER_POSTGRES_USER_PASSWORD}/g" _data/postgres/postgres_init.sql
debug "   > postgres_init.sql configured"

docker-compose -f 01-docker-compose-3rd-parties.yml -p event-manager up -d --force-recreate
success " > Deployed successfully"
sleep 1

# Deploy services
info " * Deploy services"
info "   + Backend"
cd ../backend && ~/.yarn/bin/yarn && sudo chown -R ${normalUser} node_modules
touch ormlogs.log
debug "      + $(pwd)/.env"
if [[ ! -f ".env" ]]; then
    read -p "      > No .env file found. Confirm you have set up the above .env file (y/N): " answ
    if [[ "${answ}" != "y" ]] && [[ "${answ}" != "Y" ]]; then
        error "      > User aborted"
        exit 1
    fi
fi

info "   + Frontend"
cd ../frontend && ~/.yarn/bin/yarn && sudo chown -R ${normalUser} node_modules
debug "      + $(pwd)/.env"
if [[ ! -f ".env" ]]; then
    read -p "      > No .env file found. Confirm you have set up the above .env file (y/N): " answ
    if [[ "${answ}" != "y" ]] && [[ "${answ}" != "Y" ]]; then
        error "      > User aborted"
        exit 1
    fi
fi
cd ../deployment

docker-compose -f 02-docker-compose-services.yml -p event-manager up -d --force-recreate
success "   > Deployed successfully"
sleep 1

# NGINX gateway
info " * Deploy NGINX gateway"
# cp public-nginx/nginx_basic_auth _data/nginx/nginx_basic_auth
cp nginx/nginx.conf.example _data/nginx/nginx.conf
sed -i "s/@EVENT_MANAGER_FRONTEND_EXTERNAL_DOMAIN/${EVENT_MANAGER_FRONTEND_EXTERNAL_DOMAIN}/g" _data/nginx/nginx.conf
sed -i "s/@EVENT_MANAGER_BACKEND_EXTERNAL_DOMAIN/${EVENT_MANAGER_BACKEND_EXTERNAL_DOMAIN}/g" _data/nginx/nginx.conf
debug "   > nginx.conf configured"
docker-compose -f 03-docker-compose-public-gateway.yml -p event-manager up -d --force-recreate
success "   > Deployed successfully"

migrateBackendDbSchema

# Result summary
success "\nNext steps:"
success " 1. Seed the default data: docker exec -it backend sh -c \"cd /home/node/app && yarn run migration:seed\""
success " 2. Restart services: docker restart backend frontend event-nginx"
success "\nInformation:"
success " - Postgres: localhost:5432"
success " - Frontend: https://${EVENT_MANAGER_FRONTEND_EXTERNAL_DOMAIN}"
success " - Backend API docs: https://${EVENT_MANAGER_BACKEND_EXTERNAL_DOMAIN}/docs"
success " - Admins:"
success "   + Admin: userName=admin, password=${adminPassword}, email=${adminEmail}"
