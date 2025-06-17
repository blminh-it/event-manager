FROM node:20-alpine AS builder
WORKDIR /home/node/app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
# RUN pnpm run build
CMD ["pnpm", "dev", "--host"]

# FROM nginx:stable-alpine
# COPY --from=builder /home/node/app/dist /usr/share/nginx/html
# COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
