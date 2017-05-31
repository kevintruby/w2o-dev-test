# Download base image ubuntu 16.04
FROM ubuntu:16.04

# Update Ubuntu Software repository
RUN apt-get -y update
RUN apt-get install -y build-essential checkinstall libssl-dev curl
# RUN apt-get install curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash \
&& export NVM_DIR="/root/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
&& nvm install 7.10.0 \
&& nvm use 7.10.0
RUN apt-get install -y python-software-properties vim
RUN apt-get clean
RUN apt-get install -y nginx
RUN apt-get install -y npm
RUN apt-get clean
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

# Basic npm dependencies
RUN npm install -g @angular/cli express body-parser gulp gulp-cli

# Shared Volumes
RUN mkdir -p /var/www
RUN mkdir -p /devTest

EXPOSE 3000
EXPOSE 4200
