FROM node:14.1-alpine as build

RUN adduser -D --home /home/frontend frontend

WORKDIR /home/frontend/

COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"


EXPOSE 4200

USER frontend