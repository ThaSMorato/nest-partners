FROM node:21-slim

RUN apt update && apt install -y openssl procps

RUN npm i -g pnpm

RUN npm install -g @nestjs/cli

WORKDIR /home/node/app

COPY . .

RUN pnpm i

USER node

CMD tail -f /dev/null
