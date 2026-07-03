#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Instalando dependencia 'replicate'..."
npm install --save-dev replicate

mkdir -p scripts public/images

if [ ! -f .env.example ]; then
  cat > .env.example <<'EOF'
# Token da Replicate para geracao de imagens (https://replicate.com/account/api-tokens)
REPLICATE_API_TOKEN=
EOF
fi

echo ""
echo "Setup concluido. Proximos passos:"
echo "  cp .env.example .env"
echo "  # cole seu token em .env (https://replicate.com/account/api-tokens)"
echo "  npm run gerar:hero"
