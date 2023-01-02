FROM node:18.12.1-alpine3.17 as base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

FROM base as build

WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules/ ./node_modules/
COPY . .

RUN npm run build

FROM nginx:1-alpine as prod

COPY --from=build /usr/src/app/dist/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf