FROM node:10.16-slim as BUILDER

WORKDIR /app

COPY package.json package.json

RUN npm install
#RUN npm install -g serve

COPY public public
COPY src src

#RUN npm run build

CMD [ "npm", "start" ]
#CMD [ "serve", "-s", "/app/build", "-l", "tcp://0.0.0.0:3000" ]
