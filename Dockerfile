# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY app ./
RUN npm ci --omit=dev && npm run build

# Stage 2: serve
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 8080
CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
