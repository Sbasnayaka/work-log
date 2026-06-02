FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "npx prisma generate && sleep 5 && npx prisma migrate deploy && npm run dev"]