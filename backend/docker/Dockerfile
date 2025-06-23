# --- Base stage ---
FROM node:22-alpine AS base

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

RUN rm -rf ./node_modules
RUN yarn global add @nestjs/cli
RUN yarn --frozen-lockfile --ignore-scripts --production && yarn cache clean


# --- Builder stage ---
FROM base AS builder

COPY . .

RUN yarn --frozen-lockfile --ignore-scripts
RUN yarn build

# --- Image stage ---
FROM node:22-alpine AS production

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

WORKDIR /home/node/app

COPY --from=base --chown=node:node /app/*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

RUN apk add --no-cache dumb-init

USER node

CMD ["dumb-init", "yarn", "run", "start:prod"]
