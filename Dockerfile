# Created via https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM arm64v8/node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
