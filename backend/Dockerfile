# --- Stage 1: Build app ---
FROM node:20-alpine AS builder

WORKDIR /home/node/app

# Copy package files
COPY package*.json ./

# Cài đặt dependency
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build NestJS project
RUN npm run build

# --- Stage 2: Run app ---
FROM node:20-alpine

WORKDIR /home/node/app

# Copy từ stage build
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/package.json ./package.json

# Copy env file nếu cần (hoặc mount trong docker-compose)
COPY .env .env

# Lắng nghe cổng (default NestJS)
EXPOSE 3000

# Khởi động app
CMD ["node", "dist/main"]
