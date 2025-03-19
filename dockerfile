FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
    && apt-get install -y firewalld curl openssh-server supervisor w3m apache2 net-tools nano software-properties-common python3 python3-venv libaugeas0 git \
    && a2enmod rewrite \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash \
    && apt-get install -y nodejs \
    && npm install -g npm

## ssl
RUN a2enmod ssl
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-apache
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

COPY . /var/www/html/

#archivos de configuracion
##########################
#apache
COPY ./config/apache2/apache.conf /etc/apache2/apache2.conf
COPY ./config/apache2/site-apache.conf /etc/apache2/sites-available/000-default.conf
COPY ./config/apache2/apache-certificate.crt /etc/apache2/certificate/apache-certificate.crt
COPY ./config/apache2/apache.key /etc/apache2/certificate/apache.key
COPY ./config/apache2/envvars /etc/apache2/envvars

#backend
COPY ./config/cors.js /var/www/html/backend/config/cors.js
COPY ./config/backend.env /var/www/html/backend/.env

#frontend
COPY ./config/frontend.env /var/www/html/frontend/.env

WORKDIR /var/www/html/frontend
RUN npm install && npm run build

WORKDIR /var/www/html/backend
RUN npm install

ENTRYPOINT ["npm", "start"]