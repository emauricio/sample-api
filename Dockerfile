# TODO not ready for production.
FROM node:11.5.0 AS base

ENV APP_ROOT /app/
WORKDIR $APP_ROOT

#COPY package.json $APP_ROOT
#RUN yarn install

#COPY src $APP_ROOT/src
COPY . $APP_ROOT
RUN yarn install

#COPY nodemon.json $APP_ROOT
#COPY tsconfig.json $APP_ROOT

RUN export PATH=$PATH:./node_modules/.bin

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait


