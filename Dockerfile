FROM node:14
WORKDIR /app
COPY package*.json ./
COPY avatar.json ./

RUN npm install
COPY . .
EXPOSE 42069
EXPOSE 23301/udp
CMD [ "node", "app.js" ]
