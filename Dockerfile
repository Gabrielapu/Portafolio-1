# The first instruction is what image we want to base our container on
# We Use an official node alpine image
FROM node:16-alpine

# create destination directory
ENV PROJECT_ROOT /usr/src/z3-app
RUN mkdir -p $PROJECT_ROOT
WORKDIR $PROJECT_ROOT

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git python3 make g++

# Install app dependencies
COPY package.json $PROJECT_ROOT
COPY yarn.lock $PROJECT_ROOT
RUN yarn install

# Bundle app source
COPY . $PROJECT_ROOT

ENV BASE_API_URL=/api/
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ARG RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SITE_KEY=$RECAPTCHA_SITE_KEY
ENV COOKIE_SECURE=1

RUN yarn build
# Clear the cache
RUN yarn cache clean

EXPOSE 3000
CMD ["yarn", "start"]
