@echo off
REM MAS Agent Runner - Automated workflow for all 5 agents + QA
REM Usage: run-agents.bat "Your task description"
REM Example: run-agents.bat "Build a task manager CLI in JavaScript"

setlocal enabledelayedexpansion

set "TASK=%~1"
set "WAIT_TIME=3"

if "!TASK!"=="" (
  echo Error: Task description required
  echo Usage: run-agents.bat "Your task description"
  exit /b 1
)

echo.
echo ===========================================
echo MAS Agent Automation System
echo ===========================================
echo Task: !TASK!
echo.

REM Agent 1: Architect
echo [1/6] Running Architect...
call gemini --yolo "/task:architect !TASK!"
timeout /t !WAIT_TIME! /nobreak

REM Agent 2: Logic-01
echo [2/6] Running Logic-01...
call gemini --yolo "/task:logic"
timeout /t !WAIT_TIME! /nobreak

REM Agent 3: Style-01
echo [3/6] Running Style-01...
call gemini --yolo "/task:style"
timeout /t !WAIT_TIME! /nobreak

REM Agent 4: Audit-01
echo [4/6] Running Audit-01...
call gemini --yolo "/task:audit"
timeout /t !WAIT_TIME! /nobreak

REM Agent 5: QA-01
echo [5/6] Running QA-01...
call gemini --yolo "/task:qa"
timeout /t !WAIT_TIME! /nobreak

REM Agent 6: Doc-01
echo [6/6] Running Doc-01...
call gemini --yolo "/task:doc !TASK!"

echo.
echo ===========================================
echo SUCCESS: All agents completed!
echo ===========================================
echo.
echo Work Summary:
echo - Architect: Planned the task
echo - Logic-01: Wrote the code
echo - Style-01: Formatted ^& documented
echo - Audit-01: Reviewed for quality
echo - QA-01: Approved for release
echo - Doc-01: Committed to git ^& archived
echo.
echo Check memory.md and archive/ for results
echo.
pause
