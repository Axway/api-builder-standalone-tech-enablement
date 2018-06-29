# Available versions are described at https://github.com/docker-library/mysql
FROM mysql:5
 
# Denotes to copy all files in the service to 'app' folder in the container
COPY . /app
COPY  productdb.sql /docker-entrypoint-initdb.d
 
# Sets the default working directory to /app which is where we've copied the service files to.
WORKDIR /app
 
ENV MYSQL_DATABASE=productdb
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_USER=apibuilder
ENV MYSQL_PASSWORD=apibuilder
 
# Starts the service
CMD ["docker-entrypoint.sh", "mysqld", "--datadir=/db"]