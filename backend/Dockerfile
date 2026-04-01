FROM node:20-alpine

RUN apk add --no-cache build-base python3

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
