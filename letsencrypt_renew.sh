#/bin/bash
docker run -it --rm --name certbot -v /docker-letsencrypt/etc/letsencrypt:/etc/letsencrypt -v /docker-letsencrypt/var/lib/letsencrypt:/var/lib/letsencrypt -v /root/JYList:/jylist -v /docker-letsencrypt/var/log/letsencrypt:/var/log/letsencrypt certbot/certbot renew
