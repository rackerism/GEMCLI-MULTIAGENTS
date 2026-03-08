#!/bin/bash

# MAS Agent Runner - Automated workflow for all 5 agents + QA
# Usage: ./run-agents.sh "Your task description"
# Example: ./run-agents.sh "Build a task manager CLI in JavaScript"

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
TASK_DESCRIPTION="${1:-}"
WAIT_TIME=3  # Seconds to wait between agents
MAX_RETRIES=2
RETRY_COUNT=0

# Check if task provided
if [ -z "$TASK_DESCRIPTION" ]; then
  echo -e "${RED}❌ Error: Task description required${NC}"
  echo "Usage: ./run-agents.sh \"Your task description\""
  exit 1
fi

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}MAS Agent Automation System${NC}"
echo -e "${BLUE}===========================================${NC}"
echo -e "${YELLOW}Task: ${TASK_DESCRIPTION}${NC}"
echo ""

# Function to run agent with retry on token timeout
run_agent() {
  local agent_name=$1
  local command=$2
  local retry_count=0

  echo -e "${BLUE}▶ Running ${agent_name}...${NC}"

  while [ $retry_count -le $MAX_RETRIES ]; do
    # Try to run the command
    if eval "$command"; then
      echo -e "${GREEN}✅ ${agent_name} completed${NC}"
      sleep $WAIT_TIME
      return 0
    else
      # Check if it was a token timeout
      if [ $retry_count -lt $MAX_RETRIES ]; then
        echo -e "${YELLOW}⚠️  Token timeout detected, resuming...${NC}"
        retry_count=$((retry_count + 1))
        sleep 2
        # Resume from last session
        gemini --yolo --resume latest "Continue the work" 2>/dev/null || true
      else
        echo -e "${RED}❌ ${agent_name} failed after ${MAX_RETRIES} retries${NC}"
        return 1
      fi
    fi
  done
}

# Main workflow
echo -e "${YELLOW}Starting 5-agent workflow...${NC}"
echo ""

# Agent 1: Architect
run_agent "Architect" \
  "gemini --yolo \"/task:architect ${TASK_DESCRIPTION}\""

# Agent 2: Logic-01
run_agent "Logic-01" \
  "gemini --yolo \"/task:logic\""

# Agent 3: Style-01
run_agent "Style-01" \
  "gemini --yolo \"/task:style\""

# Agent 4: Audit-01
run_agent "Audit-01" \
  "gemini --yolo \"/task:audit\""

# Agent 5: QA-01
run_agent "QA-01" \
  "gemini --yolo \"/task:qa\""

# Agent 6: Doc-01
run_agent "Doc-01" \
  "gemini --yolo \"/task:doc ${TASK_DESCRIPTION}\""

echo ""
echo -e "${GREEN}===========================================${NC}"
echo -e "${GREEN}✅ All agents completed successfully!${NC}"
echo -e "${GREEN}===========================================${NC}"
echo ""
echo -e "${BLUE}Work Summary:${NC}"
echo "- Architect: Planned the task"
echo "- Logic-01: Wrote the code"
echo "- Style-01: Formatted & documented"
echo "- Audit-01: Reviewed for quality"
echo "- QA-01: Approved for release"
echo "- Doc-01: Committed to git & archived"
echo ""
echo -e "${YELLOW}Check memory.md and archive/ for results${NC}"
