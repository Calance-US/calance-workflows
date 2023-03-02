FROM alpine:3

ARG BUILD_ARGUMENT

RUN echo ${BUILD_ARGUMENT}

CMD ["python", "-m", "http.server", "8000"]
