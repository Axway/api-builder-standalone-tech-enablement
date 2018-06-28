FROM mongo

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=admin

COPY initMyDatabase.js /docker-entrypoint-initdb.d/

CMD ["docker-entrypoint.sh", "mongod"]