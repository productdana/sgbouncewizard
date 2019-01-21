FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ARG API_URL
ENV API_URL=${API_URL}

COPY . ./

RUN npm install

RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /usr/src/app/dist/ /usr/share/nginx/html/
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

