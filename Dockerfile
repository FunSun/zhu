FROM node:10.15.3-alpine

WORKDIR /app
RUN apk add tzdata && \
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  echo "Asia/Shanghai" >  /etc/timezone && \
  apk del tzdata
COPY package.json /app/package.json
RUN apk add --no-cache make gcc g++ python && \
  npm install --production --silent && \
  apk del make gcc g++ python
COPY build /app/build
CMD ["node", "/app/build/main.js"]