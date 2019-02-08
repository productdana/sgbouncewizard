FROM node:11

WORKDIR /usr/src/app

# Copy package.json and package-lock.json into working directory
COPY package*.json ./

# Install based on package-lock.json for a stricter, clean install
RUN npm ci

# Copy source code into the image, excluding .dockerignore files
COPY . ./
