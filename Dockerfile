FROM node:latest

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN yarn install
ENV NODE_ENV=production

CMD yarn start