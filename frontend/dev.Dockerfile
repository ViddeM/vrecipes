FROM node:latest

RUN mkdir -p /usr/src/vrecept/frontend
RUN chown -R node /usr/src/vrecept/frontend

USER node

WORKDIR /usr/src/vrecept/frontend

COPY ./src/ .
COPY package.json .
COPY ./public/ .

RUN yarn install
RUN yarn global add react-scripts

EXPOSE 3000

CMD yarn start
