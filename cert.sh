#!/bin/bash
 
# Bash shell script for generating self-signed certs. Run this in a folder, as it
# generates a few files. Large portions of this script were taken from the
# following artcile:
#
# http://usrportage.de/archives/919-Batch-generating-SSL-certificates.html
#
# Additional alterations by: Brad Landers
# Date: 2012-01-27
 
# Script accepts a single argument, the fqdn for the cert
DOMAIN="$1"
if [ -z "$DOMAIN" ]; then
echo "Usage: $(basename $0) <domain>"
exit 11
fi
 
fail_if_error() {
[ $1 != 0 ] && {
unset PASSPHRASE
exit 10
}
}
 
# Generate a passphrase
export PASSPHRASE=$(head -c 96 /dev/urandom | openssl enc -base64; echo)
 
# Generate the server private key
openssl genrsa -des3 -out server.key -passout env:PASSPHRASE 2048
fail_if_error $?
echo "> Private key generated!"
 
# Generate the CSR
openssl req \
-new \
-key server.key \
-out server.csr \
-passin env:PASSPHRASE \
-config openssl.cnf
fail_if_error $?
echo "> Certificate signing request generated!"
cp server.key server.key.org
fail_if_error $?
echo "> Private key backed up!"
 
# Strip the password so we don't have to type it every time we restart Apache
openssl rsa -in server.key.org -out server.key -passin env:PASSPHRASE
fail_if_error $?
echo "> Password stripped!"
 
# Generate the cert (good for 10 years)
openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt
fail_if_error $?
echo "> Certificate generated!"
