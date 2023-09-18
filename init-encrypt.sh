#################

#!/bin/bash

domains=(api.citycard.goodgenius.ru op.citycard.goodgenius.ru  partner.citycard.goodgenius.ru  citycard.goodgenius.ru)
rsa_key_size=4096
data_path="./apps/certbot"
email="info@intellectg.ru"
staging=0             

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
    echo "### Downloading recommended TLS parameters ..."
    mkdir -p "$data_path/conf"
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf >"$data_path/conf/options-ssl-nginx.conf"
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem >"$data_path/conf/ssl-dhparams.pem"
    echo
fi

for domain in "${domains[@]}"; do
    echo "### Removing old certificate for $domain ..."
    docker compose -f docker-compose.yml run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domain && \
    rm -Rf /etc/letsencrypt/archive/$domain && \
    rm -Rf /etc/letsencrypt/renewal/$domain.conf" certbot
    echo
done

for domain in "${domains[@]}"; do
    echo "### Creating dummy certificate for $domain ..."
    path="/etc/letsencrypt/live/$domain"
    mkdir -p "$data_path/conf/live/$domain"
    docker compose -f docker-compose.yml run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:1024 -days 1\
      -keyout "$path/privkey.pem" \
      -out "$path/fullchain.pem" \
      -subj '/CN=localhost'"  certbot
    echo
done

echo "### Starting nginx ..."
docker compose up --force-recreate -d
echo

for domain in "${domains[@]}"; do
    echo "### Removing dummy certificate for $domain ..."
    docker compose -f docker-compose.yml run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domain" certbot
    echo
done

echo "### Requesting Let's Encrypt certificates ..."

# Select appropriate email arg
case "$email" in
"") email_arg="--register-unsafely-without-email" ;;
*) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

for domain in "${domains[@]}"; do
    docker compose -f docker-compose.yml run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      $staging_arg \
      $email_arg \
      -d $domain \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --force-renewal"  certbot
    echo
done

echo "### Reloading nginx ..."
docker compose exec nginx nginx -s reload