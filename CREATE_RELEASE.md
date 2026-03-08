# How to Create a GitHub Release

This guide explains how to create a Release on GitHub with the setup files (setup.sh and setup.bat) so users can download them directly.

## Option 1: Using GitHub Web UI (Easiest)

1. Go to: https://github.com/rackerism/GEMCLI-MULTIAGENTS
2. Click on **Releases** (right side, under the repo name)
3. Click **Create a new release**
4. Fill in the fields:

   **Tag version:** `v1.0.0`

   **Release title:** `Multi-Agent System v1.0.0 - Initial Release`

   **Describe this release:** (Copy content from RELEASE_NOTES.md below)

5. **Upload assets:**
   - Click "Attach binaries by dropping them here or selecting them"
   - Select both files:
     - `setup.sh`
     - `setup.bat`

6. Click **Publish release**

### Release Description (copy from RELEASE_NOTES.md)

```markdown
A complete multi-agent coding system powered by Google's Gemini CLI.

## ⚡ Quick Start

### Windows
Download and run: setup.bat

### Unix/Linux/macOS
Download setup.sh, then:
```bash
chmod +x setup.sh
./setup.sh
```

## What setup does:
- ✅ Verifies Gemini CLI is installed
- ✅ Opens VS Code
- ✅ Configures 5 agent terminals
- ✅ Starts Gemini CLI in each terminal

## Documentation
- README.md — Full user guide
- INSTALL.md — Detailed setup instructions
- GEMINI.md — Agent architecture
- RELEASE_NOTES.md — Complete feature list

See https://github.com/rackerism/GEMCLI-MULTIAGENTS for full documentation.
```

---

## Option 2: Using GitHub CLI (if installed)

```bash
gh release create v1.0.0 \
  --title "Multi-Agent System v1.0.0 - Initial Release" \
  --notes-file RELEASE_NOTES.md \
  setup.sh setup.bat
```

---

## Option 3: Using GitHub API (curl)

Get your GitHub token first, then:

```bash
GITHUB_TOKEN="your_github_token_here"
REPO="rackerism/GEMCLI-MULTIAGENTS"
TAG="v1.0.0"

# Create the release
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/$REPO/releases \
  -d '{
    "tag_name": "'$TAG'",
    "name": "Multi-Agent System v1.0.0 - Initial Release",
    "body": "A complete multi-agent coding system powered by Gemini CLI. See RELEASE_NOTES.md for details.",
    "draft": false,
    "prerelease": false
  }'

# Upload setup.sh
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @setup.sh \
  "https://uploads.github.com/repos/$REPO/releases/$(RELEASE_ID)/assets?name=setup.sh"

# Upload setup.bat
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @setup.bat \
  "https://uploads.github.com/repos/$REPO/releases/$(RELEASE_ID)/assets?name=setup.bat"
```

(You'll need to replace `$(RELEASE_ID)` with the actual release ID from the first curl response)

---

## Verification

After creating the release:

1. Go to: https://github.com/rackerism/GEMCLI-MULTIAGENTS/releases
2. You should see your new release with:
   - ✅ Tag: v1.0.0
   - ✅ setup.sh (downloadable)
   - ✅ setup.bat (downloadable)
   - ✅ Release notes with full documentation

Users can now download the setup files directly from the Releases page!

---

## What Users Will See

On the Releases page, they'll see:

```
📦 Multi-Agent System v1.0.0 - Initial Release

A complete multi-agent coding system powered by Google's Gemini CLI.

✨ Assets
- setup.sh (Download for Unix/Linux/macOS)
- setup.bat (Download for Windows)

📖 Full documentation in README.md, INSTALL.md, and RELEASE_NOTES.md
```

---

## Recommended: Option 1 (Web UI)

It's the simplest and most user-friendly. Just:
1. Go to Releases page
2. Click "Create a new release"
3. Copy-paste the values from above
4. Upload the 2 files
5. Publish

Done! 🎉
