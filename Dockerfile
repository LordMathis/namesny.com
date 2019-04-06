FROM node:10-alpine
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
