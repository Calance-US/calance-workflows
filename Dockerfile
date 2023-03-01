FROM python:3.8-alpine

ENV PORT=$RANDOM

EXPOSE ${PORT}

CMD ["python", "-m", "http.server", "8000"]
