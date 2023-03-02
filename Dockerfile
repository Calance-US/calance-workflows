FROM alpine:3.14

ARG package

CMD echo ${package}
