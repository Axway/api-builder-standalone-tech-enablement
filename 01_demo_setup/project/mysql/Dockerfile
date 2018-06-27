# See the README.md for usage and configuration info

# This line defines which Mysql Docker image to leverage
# Available versions are described at https://github.com/docker-library/mysql
FROM mysql

# Denotes to copy all files in the service to 'app' folder in the container
COPY . /app

# Sets the default working directory to /app which is where we've copied the service files to.
WORKDIR /app

# Initialize mysql and set root user password
COPY ./productdb.sql /tmp/

# Initialize mysql db (exits) and then initialize the root user
RUN /usr/sbin/mysqld --initialize-insecure --user=root --default-authentication-plugin=mysql_native_password --datadir=/db --init-file=/tmp/productdb.sql

# Starts the service
CMD ["docker-entrypoint.sh", "mysqld"]