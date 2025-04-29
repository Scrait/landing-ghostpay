# Стадия сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники и собираем проект
COPY . .
RUN npm run build

# Стадия с Nginx для обслуживания сборки
FROM nginx:stable-alpine

# Копируем собранный фронтенд в директорию Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфиг Nginx (позже добавим)
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
