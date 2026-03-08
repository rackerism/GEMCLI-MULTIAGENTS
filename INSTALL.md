# Installation & Setup — Gemini CLI (FREE)

Get up and running with the Gemini CLI using your free Google account. **No API key. No payment. No setup fees.**

---

## Prerequisites

- Node.js 16+ ([download here](https://nodejs.org))
- npm (comes with Node.js)
- A free Google account
- Git (optional, but recommended for Doc-01 agent)

---

## Step 1: Install Node.js

### Windows
1. Visit https://nodejs.org
2. Download **LTS** version (recommended)
3. Run the installer, click **Next** through all prompts
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   Both should print version numbers.

### macOS
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org
```

### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

---

## Step 2: Install Gemini CLI

Open your terminal/PowerShell and run:

```bash
npm install -g @google/gemini-cli
```

**What this does:**
- Downloads the Gemini CLI tool globally
- Makes `gemini` command available everywhere

**Verify installation:**
```bash
gemini --version
```

Should print something like: `@google/gemini-cli 0.x.x`

---

## Step 3: Authenticate with Your Google Account (FREE)

Run:
```bash
gemini login
```

**What happens:**
1. Your browser opens automatically
2. Sign in with your Google account (free account is fine)
3. You'll be asked to grant permission to Gemini CLI
4. Click **Allow**
5. You're redirected back to terminal with confirmation

**Important Notes:**
- ✅ This is **completely free** — no API key, no payment
- ✅ Uses OAuth (your credentials never leave Google)
- ✅ You only do this once; credentials are cached locally

**Verify authentication:**
```bash
gemini "Hello, are you working?"
```

You should get a response from Gemini. If so, you're authenticated.

---

## Step 4: Clone/Download the MAS Project

```bash
# Option A: Clone from git
git clone <your-repo-url>
cd agentstacking

# Option B: Download manually
# Download all files to a folder called 'agentstacking'
cd agentstacking
```

**Files you should have:**
```
agentstacking/
├── GEMINI.md          ← System prompt (auto-loaded)
├── memory.md          ← Shared blackboard
├── README.md          ← Usage guide
├── INSTALL.md         ← This file
└── .geminiignore      ← Ignore patterns
```

---

## Step 5: Initialize Git (Optional but Recommended)

If you plan to use the **Doc-01** agent to commit code, initialize a git repository:

```bash
cd agentstacking
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

**Optional: Add a remote for pushing**

If you want Doc-01 to push to GitHub:

1. Create a new repository on GitHub (don't initialize with README)
2. Copy the SSH or HTTPS URL
3. Run:
   ```bash
   git remote add origin <your-repo-url>
   ```

**Verify git setup:**
```bash
git status
```

Should show: `On branch main` (or master) with no errors.

---

## Step 6: Verify Everything Works

1. Open a terminal and navigate to the project folder:
   ```bash
   cd /path/to/agentstacking
   ```

2. Start the Gemini CLI:
   ```bash
   gemini
   ```

3. You should see the Gemini prompt. Test it:
   ```
   @memory.md What is in the memory file?
   ```

   Gemini should read `memory.md` and describe its contents.

4. Type `exit` or `quit` to exit.

5. Verify GEMINI.md is being read:
   ```bash
   gemini "What are your agent roles?"
   ```

   You should get a response referencing Architect, Logic-01, Style-01, Audit-01, Doc-01.

---

## Step 7: Set Up 5 Terminal Windows

Open 5 terminal windows (or tabs), all in the same project directory:

**Terminal 1:** Architect (user-facing)
```bash
cd /path/to/agentstacking
gemini
```

**Terminals 2-5:** Workers (Logic-01, Style-01, Audit-01, Doc-01)
```bash
cd /path/to/agentstacking
gemini
```

Each terminal will run its own independent Gemini CLI session, sharing state via `memory.md`.

---

## Step 8: Try Your First Task

In **Terminal 1** (Architect), type:

```
Write a Python function that checks if a string is a palindrome
```

Watch the Architect:
1. Read your request
2. Delegate to workers via `[TASK:]` tags
3. Save its plan to `memory.md` using `write_file`

Then in **Terminal 2** (Logic-01):
```
@memory.md I see the task. Let me write the function.
```

**Terminal 2** should respond with code and use `write_file` to save it to `memory.md`.

Continue through **Terminals 3-5** (Style-01, Audit-01, Doc-01) following the workflow.

---

## Troubleshooting

### "npm: command not found"
**Solution:** Node.js is not installed. Download from https://nodejs.org

### "gemini: command not found"
**Solution:** Gemini CLI not installed.
```bash
npm install -g @google/gemini-cli
```

### "Not authenticated" or "No credentials found"
**Solution:** Run login again:
```bash
gemini login
```

### "Module not found" error
**Solution:** Re-install Gemini CLI:
```bash
npm uninstall -g @google/gemini-cli
npm install -g @google/gemini-cli
```

### `write_file` doesn't work
**Solution:** Make sure you explicitly ask Gemini to use the tool:
```
Please use the write_file tool to save this to memory.md in the Logic-01 Output section.
```

### `!git` commands don't execute
**Solution:** Ensure git is installed:
```bash
git --version
```

If not, install from https://git-scm.com

### Gemini responds but seems to "break character"
**Solution:** Remind the agent of its role:
```
@memory.md Remember: you are Logic-01, the backend specialist. Process the [TASK: Logic-01] in memory.
```

---

## Quota Limits

Free Google accounts have generous quotas for Gemini CLI:
- ~60 requests per minute
- Varies by model (gemini-2.0-flash is very cheap)

If you hit limits, just wait a minute and retry. For production use, consider Google Cloud's paid tier.

---

## Platform-Specific Notes

### Windows (PowerShell)
```powershell
# All commands work as shown above
gemini login
gemini "test"
```

### Windows (Command Prompt)
Same as PowerShell, but avoid backticks in commands.

### macOS / Linux
```bash
# All commands work as shown above
gemini login
gemini "test"
```

---

## What's Next?

1. **Read GEMINI.md** — Understand each agent's role
2. **Read README.md** — Learn the CLI features (`@file`, `write_file`, `!git`)
3. **Open 5 terminals** — One per agent
4. **Give a task** — See agents collaborate via memory.md
5. **Experiment** — Try complex, multi-step tasks

---

## Security Notes

⚠️ **DO:**
- Keep `GEMINI.md` and `memory.md` in version control
- Commit your work regularly with Doc-01
- Share agent outputs freely—they're designed for collaboration

✅ **DON'T:**
- Store API keys in your repo (you don't have any!)
- Commit sensitive data to `memory.md`
- Share credentials (use `gemini login` for personal accounts only)

---

## Getting Help

If you encounter issues:

1. **Check memory.md** — Review agent outputs for errors
2. **Run `gemini --version`** — Verify CLI is installed
3. **Run `gemini login`** — Re-authenticate if needed
4. **Check GEMINI.md** — Review agent roles and rules
5. **Test basic functionality** — Run `gemini "Hello"` to verify CLI works

---

**You're ready to go!** Start with:
```bash
cd /path/to/agentstacking
gemini
```

Type: `@memory.md What should I do?`

Happy agent stacking! 🚀
