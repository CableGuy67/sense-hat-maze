# image names can be found at:
# https://hub.docker.com/r/resin/raspberrypi3-node/tags/
FROM resin/raspberrypi3-node

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . ./

# startup from package.json
CMD ["npm", "start"]
