FROM python:3.8-alpine

RUN echo $RANDOM

CMD ["python", "-m", "http.server", "8000"]
