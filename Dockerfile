FROM node:10 as build-stage

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . ./

RUN npm install

