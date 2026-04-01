FROM node:20-slim

RUN apt-get update && apt-get install -y build-essential python3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build
RUN mkdir -p /app/public/uploads

EXPOSE 8080

CMD ["npm", "run", "start"]
