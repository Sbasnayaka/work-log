FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json || true
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]