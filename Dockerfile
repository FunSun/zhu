FROM node:10.15.3-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN apk add --no-cache make gcc g++ python && \
  npm install --production --silent && \
  apk del make gcc g++ python
COPY build /app/build
CMD ["node", "/app/build/main.js"]