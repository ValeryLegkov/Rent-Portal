# Используем официальный образ Bun
FROM jarredsumner/bun:edge

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и bun.lockb
COPY package.json bun.lockb ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код приложения
COPY . .

# Сборка приложения
RUN bun run build

# Экспортируем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["bun", "run", "start"]
