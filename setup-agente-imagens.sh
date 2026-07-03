#!/bin/bash
set -e

AGENT_FILE="agente-imagens.md"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_FILE="$SCRIPT_DIR/$AGENT_FILE"

if [ ! -f "$SOURCE_FILE" ]; then
  echo "Erro: $AGENT_FILE não encontrado em $SCRIPT_DIR"
  exit 1
fi

if [ "$1" == "--global" ]; then
  DEST_DIR="$HOME/.claude/agents"
  SCOPE="global (~/.claude/agents)"
else
  DEST_DIR="$SCRIPT_DIR/.claude/agents"
  SCOPE="este projeto (.claude/agents)"
fi

mkdir -p "$DEST_DIR"
cp "$SOURCE_FILE" "$DEST_DIR/$AGENT_FILE"

echo "Agente de imagens instalado em: $SCOPE"
echo "-> $DEST_DIR/$AGENT_FILE"
