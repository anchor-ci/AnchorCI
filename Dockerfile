FROM node:10.16-slim

WORKDIR /app
COPY package.json package.json

RUN npm install

COPY public public
COPY src src

CMD [ "npm", "start" ]
