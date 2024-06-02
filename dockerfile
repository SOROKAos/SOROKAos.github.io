# Використовує офіційний образ Node.js як базовий образ
FROM node:18

# Встановлює робочу директорію в контейнері
WORKDIR /app

# Скопіює package.json і package-lock.json
COPY package*.json ./

# Встановлення залежності
RUN npm install

# Скопіює всі файли проекту в робочу директорію контейнера
COPY . .

# Збудуйє проект (якщо потрібно)
RUN npm run build

# Експортує порт для доступу до сервера
EXPOSE 8080

# Команда для запуску додатку
CMD ["npx", "live-server", "public", "--port=8080"]
