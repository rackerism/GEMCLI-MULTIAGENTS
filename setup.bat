@echo off
REM
REM MAS (Multi-Agent System) Setup Script
REM Initializes 5 Gemini CLI terminals in VS Code for the multi-agent workflow
REM
REM Usage: setup.bat
REM Requires: Gemini CLI (npm install -g @google/gemini-cli)
REM

setlocal enabledelayedexpansion

echo.
echo ==========================================
echo 🚀 Multi-Agent System (MAS) Setup
echo ==========================================
echo.

REM Check if Gemini CLI is installed
gemini --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Gemini CLI not found!
    echo.
    echo Please install Gemini CLI first:
    echo   npm install -g @google/gemini-cli
    echo.
    echo Then authenticate:
    echo   gemini login
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('gemini --version') do set GEMINI_VERSION=%%i
echo ✅ Gemini CLI detected: %GEMINI_VERSION%
echo.

REM Check if authenticated
echo Checking Gemini CLI authentication...
gemini "Test connection" >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Gemini CLI not authenticated!
    echo.
    echo Please authenticate first:
    echo   gemini login
    echo.
    pause
    exit /b 1
)

echo ✅ Gemini CLI authenticated
echo.

echo ==========================================
echo 📂 Opening project in VS Code...
echo ==========================================
echo.

REM Open VS Code
where code >nul 2>&1
if errorlevel 1 (
    echo ⚠️  VS Code not found in PATH
    echo Please open VS Code manually in this folder
    echo.
    pause
) else (
    code .
    echo ✅ VS Code opened
)

echo.
echo ==========================================
echo 📋 Next Steps
echo ==========================================
echo.
echo 1. In VS Code, open the Integrated Terminal (Ctrl + `)
echo 2. Split the terminal into 5 panes:
echo    - Click the '+' button on the top-right of the terminal panel
echo    - Repeat 4 more times (until you have 5 panes)
echo.
echo 3. Rename each terminal tab:
echo    - Right-click each tab and select "Rename Terminal"
echo    - Tab 1: Architect
echo    - Tab 2: Logic-01
echo    - Tab 3: Style-01
echo    - Tab 4: Audit-01
echo    - Tab 5: Doc-01
echo.
echo 4. In each terminal, run: gemini
echo.
echo 5. Start using slash commands:
echo    /task:architect [your task]
echo.
echo ==========================================
echo ✨ MAS is ready!
echo ==========================================
echo.

pause
