FROM mongo

COPY . /app
WORKDIR /app

COPY initMyDatabase.js /docker-entrypoint-initdb.d/

CMD ["docker-entrypoint.sh", "mongod"]