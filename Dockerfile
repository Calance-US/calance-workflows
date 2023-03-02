FROM alpine:3

ARG build_argument

RUN echo ${build_argument}

CMD ["python", "-m", "http.server", "8000"]
