#!/bin/sh

cat <<EOF > /usr/share/nginx/html/config.js
window.__CONFIG__ = {
  API_BASE_URL: "${API_BASE_URL:-http://localhost:8080/api}"
};
EOF

exec "$@"
