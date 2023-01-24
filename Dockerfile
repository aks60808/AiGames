FROM node:19-alpine3.16 as build

RUN apk add bash npm

RUN mkdir aigames

COPY . /aigames

WORKDIR /aigames

RUN npm install &> /dev/null

#RUN npm run build


#FROM node:19-alpine3.16

#UN apk add bash npm

# RUN mkdir build_from_p

# COPY --from=build /aigames/build ./build_from_p

# RUN npm install -g serve

# EXPOSE 3000


