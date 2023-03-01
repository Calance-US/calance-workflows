FROM alpine:latest

ARG BUILD_ARGUMENT=1

RUN echo ${BUILD_ARGUMENT}

CMD ["python", "-m", "http.server", "8000"]
