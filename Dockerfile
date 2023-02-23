FROM node:19-alpine3.16 as build

RUN apk add bash npm

RUN mkdir aigames

COPY . /aigames

WORKDIR /aigames

EXPOSE 3000


