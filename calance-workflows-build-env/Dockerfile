FROM python:3.8-alpine

WORKDIR /app

COPY . .

RUN ls -a

RUN cat .env

CMD ["python", "-m", "http.server", "8000"]
