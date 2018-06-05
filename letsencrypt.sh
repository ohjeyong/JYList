#/bin/bash

docker run -it --rm -v /docker-letsencrypt/etc/letsencrypt:/etc/letsencrypt -v /docker-letsencrypt/var/lib/letsencrypt:/var/lib/letsencrypt -v /root/JYList:/jylist -v /docker-letsencrypt/var/log/letsencrypt:/var/log/letsencrypt certbot/certbot certonly --webroot --email ojy6042@gmail.com --agree-tos --no-eff-email --webroot-path=/jylist -d jylist.cc

