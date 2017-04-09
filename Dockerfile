FROM python:3-slim
ADD . /chara
WORKDIR /chara
RUN apt-get update && apt-get install -y libpq-dev gcc
RUN pip3 install -r ./requirements.txt
LABEL version="1.0"
EXPOSE 8080
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
ENTRYPOINT ["python3","chara_server.py"]
