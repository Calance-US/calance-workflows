FROM alpine:3

ARG package

RUN echo ${package}
