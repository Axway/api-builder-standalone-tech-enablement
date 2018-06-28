# See the README.md for usage and configuration info

# This line defines which Mysql Docker image to leverage
# Available versions are described at https://github.com/docker-library/mysql
FROM mysql:5

# Denotes to copy all files in the service to 'app' folder in the container
COPY . /app

# Sets the default working directory to /app which is where we've copied the service files to.
WORKDIR /app

# ARG password
# ARG user 

# ENV MYSQL_USER = ${user}
# MYSQL_ROOT_PASSWORD = ${password}
ENV MYSQL_USER=root
ENV MYSQL_ROOT_PASSWORD=password

# Initialize mysql and set root user password
# COPY ./productdb.sql /tmp/
# ADD productdb.sql /tmp/productdb.sql

# COPY productdb.sql /docker-entrypoint-initdb.d/

COPY ./productdb.sql /tmp/

# Initialize mysql db (exits) and then initialize the root user
# /usr/sbin/mysqld --initialize-insecure --user=root --default-authentication-plugin=mysql_native_password --datadir=/db --init-file=/tmp/productdb.sql
# /usr/sbin/mysqld --initialize-insecure --datadir=/db --init-file=/tmp/productdb.sql
# RUN mysql -u root --password="password" productdb < /tmp/productdb.sql
# RUN ["/usr/local/bin/docker-entrypoint.sh", "mysqld", "--datadir", "/initialized-db", "--aria-log-dir-path", "/initialized-db"]
RUN /usr/sbin/mysqld --initialize-insecure --datadir=/db --init-file=/tmp/productdb.sql

# Starts the service
CMD ["docker-entrypoint.sh", "mysqld"]

# docker bulld --build_args=user=.. pasword=... -t latst . 