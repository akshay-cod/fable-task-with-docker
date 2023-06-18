FROM node:alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER root

RUN npm install -g loadtest

CMD [ "loadtest", "http://nginx/api/logs", "-t", "50", "-c", "10", "--rps", "1200" ]