FROM ubuntu:22.04

RUN apt update && apt install -y apache2 vim 

WORKDIR /var/www/html/tabuleiro

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]