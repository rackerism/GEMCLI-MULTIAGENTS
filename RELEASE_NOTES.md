# MAS Release v1.0.0

## 🚀 Multi-Agent System for Gemini CLI

A complete multi-agent coding system powered by Google's Gemini CLI. No Python, no API keys, completely free.

## 📥 Downloads

**This Release Includes:**
- **setup.sh** — Automated setup script (Unix/Linux/macOS)

**Available in Repository:**
- **setup.bat** — Windows setup script (clone repo to access)
- Full source code & documentation

---

## 📦 What's Included in the System

### Core System Files
- **GEMINI.md** — Agent constitution & system rules
- **memory.md** — Shared blackboard for inter-agent communication
- **README.md** — Complete documentation with table of contents

### Gemini CLI Skills (6 Slash Commands)
- **/task:architect** — System designer; delegates work
- **/task:logic** — Backend developer; writes code
- **/task:style** — Frontend specialist; formats output
- **/task:audit** — QA reviewer; checks quality
- **/task:doc** — DevOps manager; commits to git
- **/task:init** — System initializer; setup checklist

### Configuration Files
- **.vscode/tasks.json** — VS Code integration
- **.geminiignore** — Ignore patterns
- **INSTALL.md** — Detailed setup guide

## ⚡ Quick Start

### Prerequisites
```bash
# Install Gemini CLI
npm install -g @google/gemini-cli

# Authenticate (uses your free Google account)
gemini login
```

### Clone & Setup

```bash
git clone https://github.com/rackerism/GEMCLI-MULTIAGENTS.git
cd GEMCLI-MULTIAGENTS
```

**Unix/Linux/macOS:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**
```batch
setup.bat
```

### What setup does
- ✅ Verifies Gemini CLI is installed
- ✅ Opens VS Code
- ✅ Configures 5 agent terminals
- ✅ Starts Gemini CLI in each terminal
- ✅ Ready to use `/task:` commands

### Try Your First Command
```bash
/task:architect Write a Python function to reverse a string
```

## 📋 How It Works

**5-Agent Workflow:**
1. **Architect (Terminal 1)** → Reads your request, delegates to workers
2. **Logic-01 (Terminal 2)** → Writes code/algorithms
3. **Style-01 (Terminal 3)** → Formats with docstrings & examples
4. **Audit-01 (Terminal 4)** → Reviews for bugs & edge cases
5. **Doc-01 (Terminal 5)** → Commits changes to git

**All agents share state via memory.md** — one single file containing the entire project's work history.

## 🎯 Example Workflow

```bash
# Terminal 1 (Architect)
/task:architect Validate email addresses with regex

# Terminal 2 (Logic-01)
/task:logic

# Terminal 3 (Style-01)
/task:style

# Terminal 4 (Audit-01)
/task:audit

# Terminal 5 (Doc-01)
/task:doc "Add email validator with full documentation"
```

Each agent automatically:
- Reads memory.md to see what was assigned
- Executes its role
- Saves output back to memory.md
- Logs completion status

## 💡 Key Features

✅ **Completely Free** — Uses your Google account (no API key)
✅ **No Python Required** — Pure CLI-based system
✅ **VS Code Integrated** — Run all 5 agents in split terminals
✅ **Persistent Memory** — All work accumulates in memory.md
✅ **Git-Ready** — Doc-01 agent automates commits
✅ **Portable Skills** — 5 reusable slash commands

## 📚 Documentation

- **README.md** — Full user guide with examples
- **INSTALL.md** — Step-by-step setup instructions
- **GEMINI.md** — Agent roles, rules, and system architecture

## 🔧 Troubleshooting

**"gemini: command not found"**
```bash
npm install -g @google/gemini-cli
```

**"Not authenticated"**
```bash
gemini login
```

**setup.sh permission denied**
```bash
chmod +x setup.sh
./setup.sh
```

**VS Code not found**
- Install VS Code from https://code.visualstudio.com
- Add to PATH or open manually

## 🤝 Contributing

This is a template for multi-agent systems using Gemini CLI. Feel free to:
- Extend the agent roles
- Add new slash commands
- Customize memory.md structure
- Adapt for your workflow

## 📄 License

See LICENSE file in the repository

## 🚀 Next Steps

1. Clone the repo
2. Run setup.sh or setup.bat
3. Try your first command: `/task:architect [your task]`
4. Explore the 5-step agent workflow
5. Customize for your use case

---

**Questions?** Check README.md or INSTALL.md for detailed guides.

**Ready to build amazing things with multi-agent systems!** 🎯
