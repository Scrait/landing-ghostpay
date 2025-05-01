# Используем production-оптимизированный образ
FROM node:20-alpine as builder

WORKDIR /app
COPY . .

RUN npm install --frozen-lockfile
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npx", "next", "start"]
