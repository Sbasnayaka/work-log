FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl netcat-traditional

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/index.js"]