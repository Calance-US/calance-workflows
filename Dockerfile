<<<<<<< HEAD
FROM alpine
CMD ["sh", "-c", "while true; do sleep 60; done"]
=======
FROM python:3.9-slim
WORKDIR /app
RUN useradd -m myuser
USER myuser
COPY . /app
RUN pip install --no-cache-dir requests==2.26.0
HEALTHCHECK --interval=30s --timeout=10s CMD ["curl","-f","http://localhost/health"]
CMD ["pytest"]
>>>>>>> 4aa59bc3b517f34d7f4fe5e24c299d2a6e722227
