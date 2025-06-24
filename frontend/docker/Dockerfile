FROM node:20-alpine
WORKDIR /home/node/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
CMD ["pnpm", "dev", "--host"]
