FROM node:12
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
VOLUME /app
EXPOSE 3000
CMD [ "yarn", "start" ]
