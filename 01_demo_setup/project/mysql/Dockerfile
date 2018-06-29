# Available versions are described at https://github.com/docker-library/mysql
FROM mysql:5
 
# The db schema and data
COPY  productdb.sql /docker-entrypoint-initdb.d
 
ENV MYSQL_DATABASE=productdb
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_USER=apibuilder
ENV MYSQL_PASSWORD=apibuilder
 
# Starts the service
CMD ["docker-entrypoint.sh", "mysqld", "--datadir=/db"]
