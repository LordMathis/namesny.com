# Stage 1 - build app
FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - run
FROM node:12-alpine
WORKDIR /app
COPY --chown=node:node --from=build-deps /usr/src/app/build /app/build
COPY --chown=node:node --from=build-deps /usr/src/app/public /app/public
COPY --chown=node:node --from=build-deps /usr/src/app/node_modules /app/node_modules
VOLUME /app/config
VOLUME /app/content
RUN chown node:node /app
USER node
EXPOSE 3000
CMD [ "node", "build/server.js" ]
