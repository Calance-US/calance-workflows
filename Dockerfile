FROM python:3.8-alpine as image1

ENV PORT=$RANDOM

CMD ["python", "-m", "http.server", "8000"]

FROM python:3.8-alpine as image2

ENV PORT=$RANDOM

CMD ["python", "-m", "http.server", "8000"]
