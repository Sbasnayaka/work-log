FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    openssl \
    netcat-traditional \
 && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start"]