FROM python:3.8-alpine

WORKDIR /

COPY ./ ./

RUN ls -a

CMD ["python", "-m", "http.server", "8000"]
