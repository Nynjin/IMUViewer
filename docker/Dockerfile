FROM node:lts-alpine

RUN apk-update && apk-upgrade -y

ENTRYPOINT ["sh", "/app/docker/init.sh"]