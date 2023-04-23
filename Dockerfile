FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm install -g serve
RUN npm run build
EXPOSE 5000
CMD ["serve", "-s", "dist", "-l", "5000"]
