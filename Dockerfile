# Created via https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM arm64v8/node:18-alpine

# Configure git via https://dockerlabs.collabnix.com/beginners/dockerfile/lab1_dockerfile_git.html
RUN apk update
RUN apk add git
RUN apk add nano

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --only=production
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
