# Dockerfile base para tus servicios
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
USER node
CMD ["npm", "start"]