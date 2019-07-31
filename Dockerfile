FROM node:10.16-slim as BUILDER

WORKDIR /app
COPY package.json package.json
COPY public public
COPY src src

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD [ "serve", "-s", "/app/build", "-l", "tcp://0.0.0.0:3000" ]
