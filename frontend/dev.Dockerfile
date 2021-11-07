FROM node:16.13

WORKDIR /usr/src/vrecipes/frontend
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 10000000
# COPY .env.development .env
COPY src src
COPY public public
CMD yarn start

