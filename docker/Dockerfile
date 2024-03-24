FROM node:lts-alpine

RUN apk update

ARG MODE

ENV ENV_MODE=$MODE

ENTRYPOINT sh /app/docker/init.sh $ENV_MODE $PORT