FROM node:14.15-alpine as build

RUN adduser -D  frontend

WORKDIR /home/frontend/

COPY package*.json ./

RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
