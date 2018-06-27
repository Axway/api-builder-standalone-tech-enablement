FROM mongo

COPY . /app
WORKDIR /app

#COPY ./postaldb.sql /tmp/
#TODO MAKE IT FILL THE DATABASE
# Initialize mysql db (exits) and then initialize the root user
#RUN /usr/sbin/mysqld --initialize-insecure --user=root --default-authentication-plugin=mysql_native_password --datadir=/db --init-file=/tmp/postaldb.sql

CMD ["docker-entrypoint.sh", "mongod"]
