FROM node:16.13 AS build-step

RUN mkdir -p /usr/src/vrecipes/frontend
RUN chown -R node /usr/src/vrecipes/frontend

USER node

WORKDIR /usr/src/vrecipes/frontend

COPY ./src ./src
COPY package.json .
COPY ./public ./public

RUN yarn install
RUN yarn global add react-scripts
RUN yarn build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=build-step /usr/src/vrecipes/frontend/build/ /usr/share/nginx/html/
