FROM node:20-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["sh", "-c", "until nc -z db 5432; do echo waiting for db; sleep 2; done; npm run dev"]