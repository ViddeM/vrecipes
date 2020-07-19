FROM node:latest

WORKDIR /usr/src/vrecept/frontend
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 10000000
# COPY .env.development .env
COPY src src
COPY public public
CMD yarn start


# RUN mkdir -p /usr/src/vrecept/frontend
# RUN chown -R node /usr/src/vrecept/frontend

# USER node

# WORKDIR /usr/src/vrecept/frontend

# COPY ./src/ .
# COPY package.json .
# COPY ./public/ .

# RUN yarn install
# RUN yarn global add react-scripts

# EXPOSE 3000

# CMD yarn start
