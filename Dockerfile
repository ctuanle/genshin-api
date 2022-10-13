FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "yarn-lock.json*", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
# manually build project before running this dockerfile
# this is for not install dev_dependencies
CMD ["yarn", "start"]