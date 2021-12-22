FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json /home/node/app

COPY  . .

RUN ls

USER node

RUN npm install


EXPOSE 5000

CMD [ "npm", "start" ]