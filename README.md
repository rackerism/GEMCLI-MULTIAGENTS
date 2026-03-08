# Local Multi-Agent System (MAS) — Gemini CLI Edition

A 5-agent coding assistant using the **Gemini CLI** (completely free with Google account OAuth).

## Table of Contents

- [Quick Start](#quick-start)
- [Import Into VS Code Workspace](#import-into-vs-code-workspace)
- [Setup Commands](#setup-commands)
- [VS Code Mission Control](#vs-code-mission-control)
- [The 5-Step Sync Loop](#the-5-step-sync-loop)
- [Slash Commands (Skill Files)](#slash-commands-skill-files)
- [How to Use the CLI](#how-to-use-the-cli)
- [Agent Workflow Example](#agent-workflow-example)
- [Key Workflow Rules](#key-workflow-rules)
- [File Structure](#file-structure)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Tips & Best Practices](#tips--best-practices)
- [Next Steps](#next-steps)

---

## Overview

No Python. No API keys. No payment. Just open 5 terminal windows and let your agents collaborate via a shared blackboard (`memory.md`).

**The 5 Agents:**
1. **Architect** — User-facing; plans and delegates
2. **Logic-01** — Writes code and algorithms
3. **Style-01** — Formats and documents
4. **Audit-01** — Reviews for correctness and edge cases
5. **Doc-01** — Manages git commits and pushes

All agents read/write to `memory.md` using the Gemini CLI's built-in tools.

---

## Quick Start

### 1. Install Gemini CLI
```bash
npm install -g @google/gemini-cli
```

### 2. Authenticate (FREE — uses your Google account)
```bash
gemini login
```
You'll be prompted to sign in with your Google account. No API key needed.

### 3. Open 5 Terminal Windows
All in the same project directory.

**Terminal 1 — Architect (User Interface)**
```bash
cd /path/to/agentstacking
gemini
```

**Terminals 2-5 — Worker Agents**
```bash
cd /path/to/agentstacking
gemini
```

### 4. Give Your First Task

In **Terminal 1**, type:
```
Write a Python function to check if a number is prime
```

The Architect reads this and responds. It uses `write_file` to save its delegation plan to `memory.md`.

---

## Import Into VS Code Workspace

**⚠️ IMPORTANT:** This project requires the **Gemini CLI** (`@google/gemini-cli`). It is NOT compatible with other LLM CLIs (OpenAI, Claude, etc.). You must have Gemini CLI installed and authenticated before using this project.

### Prerequisites

Before importing this repo, ensure you have:
1. **Gemini CLI installed:** `npm install -g @google/gemini-cli`
2. **Gemini CLI authenticated:** `gemini login` (uses your free Google account)
3. **VS Code installed:** https://code.visualstudio.com
4. **Git installed:** https://git-scm.com

### Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/rackerism/GEMCLI-MULTIAGENTS.git
cd GEMCLI-MULTIAGENTS
```

### Open in VS Code

**Option 1: Command Line**
```bash
code .
```

**Option 2: VS Code Menu**
1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to the cloned `GEMCLI-MULTIAGENTS` folder
4. Click **Select Folder**

### Verify Setup

1. Open the Integrated Terminal in VS Code (`Ctrl + `` backtick)
2. Verify Gemini CLI is available:
   ```bash
   gemini --version
   ```
   Should print: `@google/gemini-cli 0.x.x` or similar
3. Verify authentication:
   ```bash
   gemini "Hello, can you see me?"
   ```
   You should get a response from Gemini

### What You've Imported

```
GEMCLI-MULTIAGENTS/
├── .gemini/commands/task/       ← 5 Gemini CLI skill files
│   ├── architect.toml           ← /task:architect command
│   ├── logic.toml               ← /task:logic command
│   ├── style.toml               ← /task:style command
│   ├── audit.toml               ← /task:audit command
│   └── doc.toml                 ← /task:doc command
├── GEMINI.md                    ← Agent system constitution
├── memory.md                    ← Shared blackboard (grows over time)
├── README.md                    ← This file
├── INSTALL.md                   ← Detailed setup guide
└── .geminiignore                ← Files to ignore
```

### Next Steps

1. **Open 5 terminals** in VS Code (see "VS Code Mission Control" section below)
2. **Rename each terminal** to match agent roles (Architect, Logic-01, Style-01, Audit-01, Doc-01)
3. **Run `gemini` in each terminal**
4. **Start using slash commands**: `/task:architect [your request]`

### This Project is Most Recommended for Gemini CLI

**🎯 Optimized & Recommended for:**
- **Gemini CLI** (`@google/gemini-cli`) — Primary choice for this system
- Google's free Gemini models (via `gemini login`)
- Google account OAuth (no API key needed)
- Free tier with generous quotas

**🔄 Can Be Adapted For:**
- Other LLM CLIs (OpenAI, Claude, Anthropic, etc.)
- The multi-agent architecture is tool-agnostic
- Skill files may need syntax adjustments for other CLI tools
- Core system design (Architect → Logic → Style → Audit → Doc) works universally

**Why Gemini CLI is Recommended:**
- ✅ Free authentication (no API key management)
- ✅ Built-in `@file` context injection
- ✅ Native `write_file` tool for persistence
- ✅ Direct `!git` command execution
- ✅ Seamless `/ide connect` integration with VS Code
- ✅ Low latency for fast agent coordination

---

## Quick Setup

**Automated Setup (Recommended):**

**Windows:** [Download setup.bat from Releases](https://github.com/rackerism/GEMCLI-MULTIAGENTS/releases) → Run it
```batch
setup.bat
```

**Unix/Linux/macOS:** Run the shell script
```bash
chmod +x setup.sh
./setup.sh
```

**VS Code Task:** Press `Ctrl+Shift+P` → Run "Initialize MAS - 5 Agents"

**Gemini CLI:** Type `/task:init` in any terminal for an interactive setup checklist

**What setup does:**
- ✅ Verifies Gemini CLI is installed & authenticated
- ✅ Opens VS Code
- ✅ Splits terminal into 5 panes
- ✅ Names each agent (Architect, Logic-01, Style-01, Audit-01, Doc-01)
- ✅ Starts `gemini` in each terminal
- ✅ Ready for `/task:` commands

---

## VS Code Mission Control

Run all 5 agents in a single IDE window using VS Code's split terminal feature. This is the recommended setup for visual coordination.

### Step 1: Open the Integrated Terminal

1. Open the project folder in VS Code
2. Press **`Ctrl + `` (backtick)** to open the Integrated Terminal
3. You'll see one terminal pane at the bottom of VS Code

### Step 2: Split Into 5 Panes

1. In the terminal, click the **`+` (split) button** on the top right of the terminal panel
2. Repeat 4 more times until you have **5 vertical panes**
   - Alternatively: Use `Ctrl + Shift + 5` keyboard shortcut to split
3. Each pane is an independent terminal session

### Step 3: Rename Each Terminal Tab

1. Right-click the **first tab** at the bottom of the terminal → **Rename Terminal** → type `Architect` → Enter
2. Right-click the **second tab** → **Rename Terminal** → type `Logic-01` → Enter
3. Right-click the **third tab** → **Rename Terminal** → type `Style-01` → Enter
4. Right-click the **fourth tab** → **Rename Terminal** → type `Audit-01` → Enter
5. Right-click the **fifth tab** → **Rename Terminal** → type `Doc-01` → Enter

Your terminal tabs should now be clearly labeled:
```
[Architect] [Logic-01] [Style-01] [Audit-01] [Doc-01]
```

### Step 4: Start Gemini in Each Pane

1. Click on the **Architect** pane
2. Run: `gemini`
3. Repeat for each pane: **Logic-01**, **Style-01**, **Audit-01**, **Doc-01**

All 5 agents are now running in parallel, each in its own terminal.

### Step 5: IDE Link (Optional Advanced Feature)

To enable automatic file diffs in VS Code when agents use `write_file`:

1. In any terminal, type: `/ide connect`
2. This links the Gemini CLI to your VS Code instance
3. When an agent saves a file, a diff panel opens automatically
4. You can approve or reject changes directly in the IDE

**Benefits:**
- See exactly what changes agents are making
- Approve/reject with a single click
- No manual file merging needed
- Real-time visual feedback

---

## The 5-Step Sync Loop

Here's the exact workflow to run any task with all 5 agents coordinating:

### Step 1: Architect (Terminal 1) — Write the Plan

In the **Architect** terminal:
```
@memory.md
User wants: [your task here]

I'll coordinate this. Let me delegate to specialists.

[TASK: Logic-01] [specific instruction for Logic-01]
[TASK: Style-01] [specific instruction for Style-01]
[TASK: Audit-01] [specific instruction for Audit-01]
[TASK: Doc-01] [specific instruction for Doc-01]

Please save this plan to memory.md using write_file.
[STATUS: Architect COMPLETED]
```

**What happens:** Architect reads memory.md, writes a delegation plan with [TASK:] tags, saves to memory.md.

### Step 2: Logic-01 (Terminal 2) — Write the Code

In the **Logic-01** terminal:
```
@memory.md
I see the [TASK: Logic-01] for me. Let me write the code/logic.

[your code/output here]

Please save this to memory.md under "Logic-01 Output" using write_file.
[STATUS: Logic-01 COMPLETED]
```

**What happens:** Logic-01 reads the task from memory.md, writes code/algorithms, saves output.

### Step 3: Style-01 (Terminal 3) — Polish & Format

In the **Style-01** terminal:
```
@memory.md
I see Logic-01's output. Let me format it professionally.

[formatted version with docstrings, examples, etc.]

Please save this to memory.md under "Style-01 Output" using write_file.
[STATUS: Style-01 COMPLETED]
```

**What happens:** Style-01 reads Logic-01's work, reformats it beautifully, saves to memory.md.

### Step 4: Audit-01 (Terminal 4) — Review for Quality

In the **Audit-01** terminal:
```
@memory.md
Let me review all the outputs from Logic-01 and Style-01.

**Strengths:**
[positive findings]

**Issues Found:**
[any problems and recommendations]

Please save this audit to memory.md under "Audit-01 Output" using write_file.
[STATUS: Audit-01 COMPLETED]
```

**What happens:** Audit-01 reads all prior work, checks for bugs/edge cases, saves findings.

### Step 5: Doc-01 (Terminal 5) — Commit to Git

In the **Doc-01** terminal:
```
@memory.md
Time to save and commit these changes.

!git add .
!git commit -m "Add [feature] with documentation and testing"
!git push origin main

All changes committed and pushed to main.
Please save a summary to memory.md under "Doc-01 Output" using write_file.
[STATUS: Doc-01 COMPLETED]
```

**What happens:** Doc-01 stages changes, commits with a message, pushes to git.

---

## Why This Works

- **Parallel Agents** — All 5 run independently in VS Code; no waiting for processes
- **Shared Blackboard** — `memory.md` keeps everyone in sync
- **Visual Coordination** — See all terminals at once; easy to track progress
- **IDE Integration** — `/ide connect` shows diffs in real-time
- **Sequential Flow** — Agents work in logical order: Plan → Code → Format → Audit → Commit

---

## Slash Commands (Skill Files)

Gemini CLI Skill files let you invoke agents instantly with `/task:` prefix. No need to type long prompts — just use the pre-built commands stored in `.gemini/commands/task/`.

### How to Use Slash Commands

In any Gemini CLI session, type:

```
/task:architect Write a Python function to validate email addresses
```

The CLI automatically:
1. Loads the skill file (`architect.toml`)
2. Replaces `{{args}}` with your input
3. Runs the Architect agent with the full prompt
4. Executes the action (read @memory.md, write plan, etc.)

### All 5 Slash Commands

| Command | Agent | Role | Action |
|---------|-------|------|--------|
| `/task:architect` | Architect | System Designer | Read @memory.md, analyze request, write delegation plan with [TASK:] tags, save to memory.md |
| `/task:logic` | Logic-01 | Backend Developer | Read @memory.md, find [TASK: Logic-01], write code/logic, save to memory.md |
| `/task:style` | Style-01 | Frontend Specialist | Read @memory.md, polish output with docstrings/examples, save to memory.md |
| `/task:audit` | Audit-01 | Quality Assurance | Read @memory.md, review all code for bugs/edge cases, write Pass/Fail report, save to memory.md |
| `/task:doc` | Doc-01 | DevOps Manager | Summarize changes, then run `!git add . && git commit -m "..."` |

### Example Workflow Using Slash Commands

**Terminal 1 (Architect):**
```
/task:architect Write a function to reverse a string
```
→ Architect reads memory.md, writes a plan, saves delegation tasks

**Terminal 2 (Logic-01):**
```
/task:logic
```
→ Logic-01 reads the [TASK: Logic-01] tag, writes the function

**Terminal 3 (Style-01):**
```
/task:style
```
→ Style-01 formats with docstrings and examples

**Terminal 4 (Audit-01):**
```
/task:audit
```
→ Audit-01 reviews for correctness, edge cases, outputs Pass/Fail

**Terminal 5 (Doc-01):**
```
/task:doc Add string reversal function with tests
```
→ Doc-01 commits to git with message: "Add string reversal function with tests"

### Skill File Location

All skill files are stored in:
```
.gemini/commands/task/
├── architect.toml
├── logic.toml
├── style.toml
├── audit.toml
└── doc.toml
```

Gemini CLI automatically discovers these files and registers the `/task:` commands.

### Why Use Slash Commands?

✅ **Faster** — No typing long prompts; just `/task:architect` + your input
✅ **Consistent** — Every agent uses the same prompt structure every time
✅ **Portable** — Share skill files with your team via GitHub
✅ **Reusable** — Use the same commands for every task
✅ **Professional** — Pre-tuned agent roles and behaviors

---

## How to Use the CLI

### 1. **Reference a File with `@`**

To inject a file's contents into your prompt:

```
@memory.md What should I do next?
```

The CLI automatically includes the full `memory.md` in your next message to Gemini.

### 2. **Save Work with `write_file`**

To append or update a file:

```
<context about your output>

Please save this to memory.md in the "Logic-01 Output" section using the write_file tool.
```

The Gemini CLI will use its `write_file` tool to save your work. You don't need to manually edit.

### 3. **Run Git Commands with `!git`**

To execute git commands directly in the CLI:

```
!git add .
!git commit -m "Add prime number checker"
!git push origin main
```

The `!git` prefix tells the CLI to execute the command as a shell command.

---

## Agent Workflow Example

### Scenario: "Write a Python function to validate email addresses"

**Terminal 1 (Architect):**
```
User Input: Write a Python function to validate email addresses

Architect Response:
I'll coordinate this work. Let me delegate to our specialists.

[TASK: Logic-01] Write a Python function that validates email addresses using regex.
Handle edge cases: None input, very long strings, internationalized domains.

[TASK: Style-01] Format the function with docstring, type hints, and 3+ examples.

[TASK: Audit-01] Review for correctness and suggest improvements.

[STATUS: Architect COMPLETED]

---
Please save this plan to memory.md under the "Architect Plan" section using write_file.
```

**Terminal 2 (Logic-01):**
```
@memory.md

I see the task. Let me write the email validation function.

[Writes the regex-based function with comments]

---
Please save this code to memory.md under the "Logic-01 Output" section using write_file.

[STATUS: Logic-01 COMPLETED]
```

**Terminal 3 (Style-01):**
```
@memory.md

I see Logic-01's output. Let me format it professionally.

[Formats with docstring, type hints, and examples]

---
Please save this to memory.md under the "Style-01 Output" section using write_file.

[STATUS: Style-01 COMPLETED]
```

**Terminal 4 (Audit-01):**
```
@memory.md

Let me review the complete solution for correctness and edge cases.

[Reviews Logic-01 and Style-01 outputs, suggests improvements]

---
Please save this audit to memory.md under the "Audit-01 Output" section using write_file.

[STATUS: Audit-01 COMPLETED]
```

**Terminal 5 (Doc-01):**
```
@memory.md

Time to commit these changes.

!git add .
!git commit -m "Add email validation function with full documentation"
!git push origin main

---
Please save a summary to memory.md under the "Doc-01 Output" section using write_file.

[STATUS: Doc-01 COMPLETED]
```

**Terminal 1 (Architect):**
```
@memory.md

All work complete. Here's the summary for the user:

---
Your email validation function is ready!
- Logic-01 wrote the regex-based validation
- Style-01 added professional formatting and examples
- Audit-01 reviewed for edge cases
- Doc-01 committed to git

The function is production-ready and handles edge cases including:
None inputs, very long strings, and internationalized domains.
```

---

## Key Workflow Rules

1. **Always start with `@memory.md`** — Load current state before acting
2. **Always end with `write_file`** — Save your output to memory.md
3. **Always log status** — End with `[STATUS: YOUR_ROLE COMPLETED]` or `[STATUS: YOUR_ROLE FAILED]`
4. **Never break character** — Stay in your agent role throughout
5. **Sequential order** — Architect → Logic → Style → Audit → Doc

---

## File Structure

```
agentstacking/
├── GEMINI.md          ← System prompt (auto-loaded by Gemini CLI)
├── memory.md          ← Shared blackboard (read/write by all agents)
├── README.md          ← This file
├── INSTALL.md         ← Setup instructions
└── .geminiignore      ← Files to ignore
```

---

## Advanced Features

### Persistent Memory Across Sessions

`memory.md` is never cleared. Each session appends to it:

**Session 1:**
- Architect plan
- Logic-01 output
- Style-01 output
- ...

**Session 2:**
- New Architect plan
- New Logic-01 output
- ...
(All Session 1 work still visible)

Agents can reference previous work for context.

### Git Integration with Doc-01

Use `!git` in Terminal 5 to:
- Stage changes: `!git add .`
- Commit: `!git commit -m "Your message"`
- Push: `!git push origin main`
- View status: `!git status`
- View log: `!git log --oneline`

All git operations are tracked in `memory.md` by Doc-01.

### Spawning New Sub-Tasks

Architect can request multiple rounds of work:

```
@memory.md

First, let's add error handling to the email validator.

[TASK: Logic-01] Add try/except blocks and custom exceptions.
[TASK: Style-01] Update docstrings to document the exceptions.
[TASK: Audit-01] Review exception handling for robustness.
```

Then run the workers again in new terminal sessions.

---

## Troubleshooting

### "gemini: command not found"
- Ensure Gemini CLI is installed: `npm install -g @google/gemini-cli`
- Verify Node.js is installed: `node --version`

### "Not authenticated"
- Run `gemini login` and sign in with your Google account
- Verify with: `gemini --version`

### File not found when using `@memory.md`
- Ensure you're in the correct directory: `pwd` (macOS/Linux) or `cd` (Windows)
- Ensure `memory.md` exists in the current folder

### `write_file` not working
- The Gemini CLI must recognize `write_file` as a tool request
- Explicitly ask Gemini: "Please use the write_file tool to save this..."
- Verify the file path is correct (relative to current directory)

### Git commands fail with `!git`
- Ensure git is installed: `git --version`
- Ensure the directory is a git repo: `git status`
- If not, initialize: `!git init`

---

## Tips & Best Practices

1. **Keep memory.md organized** — Use clear section headers
2. **Log everything** — Always end with status logs
3. **Use one terminal per agent** — Clearer workflow, easier debugging
4. **Read memory first** — Always start with `@memory.md`
5. **Test locally** — Run `gemini "Hello"` to verify CLI works
6. **Split long tasks** — Break into multiple `[TASK:]` delegations

---

## Next Steps

1. See **INSTALL.md** for detailed setup
2. Run `gemini login` and authenticate
3. Open 5 terminals and start the workflow
4. Try a simple task first: "Write a hello-world Python script"
5. Observe how agents collaborate via memory.md

Enjoy your multi-agent system! 🚀
