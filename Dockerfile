FROM alpine:3.14

ARG package

RUN echo ${package}

RUN apk add --no-cache mysql-client

ENTRYPOINT ["mysql"]
