#!/bin/bash
#
# MAS (Multi-Agent System) Setup Script
# Initializes 5 Gemini CLI terminals in VS Code for the multi-agent workflow
#
# Usage: ./setup.sh
# Requires: Gemini CLI (npm install -g @google/gemini-cli)
#

set -e  # Exit on error

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_NAME="GEMCLI-MULTIAGENTS"

echo "=========================================="
echo "🚀 Multi-Agent System (MAS) Setup"
echo "=========================================="
echo ""

# Check if Gemini CLI is installed
if ! command -v gemini &> /dev/null; then
    echo "❌ ERROR: Gemini CLI not found!"
    echo ""
    echo "Please install Gemini CLI first:"
    echo "  npm install -g @google/gemini-cli"
    echo ""
    echo "Then authenticate:"
    echo "  gemini login"
    echo ""
    exit 1
fi

echo "✅ Gemini CLI detected: $(gemini --version)"
echo ""

# Check if authenticated
echo "Checking Gemini CLI authentication..."
if gemini "Test connection" &> /dev/null; then
    echo "✅ Gemini CLI authenticated"
else
    echo "❌ ERROR: Gemini CLI not authenticated!"
    echo ""
    echo "Please authenticate first:"
    echo "  gemini login"
    echo ""
    exit 1
fi

echo ""
echo "=========================================="
echo "📂 Opening project in VS Code..."
echo "=========================================="
echo ""

cd "$SCRIPT_DIR"

# Open VS Code
if command -v code &> /dev/null; then
    code .
    echo "✅ VS Code opened"
else
    echo "⚠️  VS Code not found in PATH"
    echo "Please open VS Code manually:"
    echo "  code $SCRIPT_DIR"
fi

echo ""
echo "=========================================="
echo "📋 Next Steps"
echo "=========================================="
echo ""
echo "1. In VS Code, open the Integrated Terminal (Ctrl + `)"
echo "2. Split the terminal into 5 panes:"
echo "   - Click the '+' button on the top-right of the terminal panel"
echo "   - Repeat 4 more times (until you have 5 panes)"
echo ""
echo "3. Rename each terminal tab:"
echo "   - Right-click each tab → Rename Terminal"
echo "   - Tab 1: Architect"
echo "   - Tab 2: Logic-01"
echo "   - Tab 3: Style-01"
echo "   - Tab 4: Audit-01"
echo "   - Tab 5: Doc-01"
echo ""
echo "4. In each terminal, run: gemini"
echo ""
echo "5. Start using slash commands:"
echo "   /task:architect [your task]"
echo ""
echo "=========================================="
echo "✨ MAS is ready!"
echo "=========================================="
echo ""
