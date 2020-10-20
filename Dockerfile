FROM node:lts-alpine

RUN yarn global add http-server
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
ENV VUE_APP_URL='https://api.arifh.web.id'
ENV VUE_APP_STATIC_URL='https://api.arifh.web.id/public/upload/'
RUN yarn build
VOLUME /dist/public
EXPOSE 8080
CMD [ "http-server", "dist"]