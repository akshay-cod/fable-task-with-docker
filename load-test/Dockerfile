FROM node:alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER root

RUN npm install -g loadtest

CMD [ "loadtest", "http://nodeapp:8989/api/logs", "-t", "10", "-c", "10", "--rps", "1000" ]