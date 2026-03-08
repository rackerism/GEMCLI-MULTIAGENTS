# MAS Blackboard / Memory
_Shared state file. All agents read and write here._

## Current Task
Build a CLI counter tool in JavaScript using Node.js and Commander.js.
- increment: increase count by 1
- decrement: decrease count by 1
- reset: set count to 0
- get: display current count
Store count in `counter.json`.

## Architect Plan
[TASK: Logic-01]
- Initialize a Node.js project and install `commander`.
- Implement subcommands: `increment`, `decrement`, `reset`, and `get`.
- Logic: Use `counter.json` for persistence. Ensure it's created with `{"count": 0}` if missing.
- Include basic error handling for file operations.

[TASK: Style-01]
- Enhance CLI help text and console output formatting.
- Implement clear messaging for each action (e.g., "Count reset to 0").
- Structure code for readability and maintainability.

[TASK: Audit-01]
- Test for edge cases (file read/write errors, invalid JSON data).
- Verify persistent state and correct behavior across all command combinations.

[TASK: Doc-01]
- Create/Update `README.md` with installation and usage instructions.
- Handle git staging and commit for the initial implementation.

## Agent Outputs

### Logic-01 Output
I have implemented the CLI counter tool in `index.js`.
- Used `commander` for subcommand handling.
- Implemented `getCounter()` and `saveCounter()` for JSON file persistence.
- Added subcommands for `increment`, `decrement`, `reset`, and `get`.
- Included basic `try-catch` blocks for file I/O operations.

```javascript
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const COUNTER_FILE = path.join(__dirname, 'counter.json');

// Helper function: Load or initialize the counter file
function getCounter() {
    try {
        if (!fs.existsSync(COUNTER_FILE)) {
            const initial = { count: 0 };
            fs.writeFileSync(COUNTER_FILE, JSON.stringify(initial, null, 2));
            return initial;
        }
        const data = fs.readFileSync(COUNTER_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or initializing counter file:', err.message);
        process.exit(1);
    }
}

// Helper function: Save the counter to the file
function saveCounter(counter) {
    try {
        fs.writeFileSync(COUNTER_FILE, JSON.stringify(counter, null, 2));
    } catch (err) {
        console.error('Error saving counter file:', err.message);
        process.exit(1);
    }
}

program.name('counter-cli').description('A simple CLI counter tool');

program.command('increment').description('Increase count by 1').action(() => {
    const counter = getCounter();
    counter.count += 1;
    saveCounter(counter);
    console.log(`Count: ${counter.count}`);
});

program.command('decrement').description('Decrease count by 1').action(() => {
    const counter = getCounter();
    counter.count -= 1;
    saveCounter(counter);
    console.log(`Count: ${counter.count}`);
});

program.command('reset').description('Set count to 0').action(() => {
    const counter = { count: 0 };
    saveCounter(counter);
    console.log(`Count: ${counter.count}`);
});

program.command('get').description('Display current count').action(() => {
    const counter = getCounter();
    console.log(`Count: ${counter.count}`);
});

program.parse(process.argv);
```

### Style-01 Output
(none)

### Audit-01 Output
I've reviewed all outputs in memory.md. Here's my audit report:

**✓ Strengths:**
- **Functional Correctness:** All required subcommands (`increment`, `decrement`, `reset`, `get`) are implemented and function according to requirements.
- **Persistence:** Successfully uses `counter.json` to maintain state across different executions.
- **Library Usage:** Correct use of `commander` for robust CLI argument parsing and help generation.
- **Error Handling:** Includes `try-catch` blocks to prevent unhandled exceptions during file I/O.

**⚠ Issues Found:**
1. **Missing Style-01 Contribution:** The `Style-01` agent has not provided any output. The UI/UX enhancements requested in the Architect's plan (clear messaging like "Count reset to 0") are missing. Currently, the tool only prints "Count: X", which is the bare minimum.
2. **Brittle Persistence Path:** Using `path.join(__dirname, 'counter.json')` is discouraged for CLI tools. If the tool is installed globally, `__dirname` points to the global `node_modules` folder, which is often read-only for standard users and shared across all system users.
3. **JSON Corruption Handling:** If `counter.json` is empty or contains invalid JSON, `JSON.parse()` will throw an error and the tool will exit. It does not attempt to "self-heal" by resetting the counter or prompting the user.
4. **Atomic Writes:** The tool writes directly to the target file. While acceptable for a simple CLI, it lacks atomicity; if the process is killed during `fs.writeFileSync`, the data could be lost or corrupted.

**Edge Cases to Consider:**
- **Permissions Error:** Handled by exiting, but could be more descriptive about *why* it failed (e.g., "Permission denied at PATH").
- **Manual File Modification:** If a user manually edits the JSON to a non-object or removes the `count` key, the code `counter.count += 1` will result in `NaN`.

**Overall: FAIL**
While the logic is sound for a prototype, the absence of the `Style-01` formatting pass and the reliance on `__dirname` for data storage make it unfit for a production-ready CLI tool.

[STATUS: Audit-01 COMPLETED]

### Doc-01 Output
(none)

## Status Log
[STATUS: Architect COMPLETED]
[STATUS: Logic-01 COMPLETED]
[STATUS: Audit-01 COMPLETED]
