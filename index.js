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
        // Basic error handling for file operations
        console.error('Error reading or initializing counter file:', err.message);
        process.exit(1);
    }
}

// Helper function: Save the counter to the file
function saveCounter(counter) {
    try {
        fs.writeFileSync(COUNTER_FILE, JSON.stringify(counter, null, 2));
    } catch (err) {
        // Basic error handling for file operations
        console.error('Error saving counter file:', err.message);
        process.exit(1);
    }
}

program
    .name('counter-cli')
    .description('A simple CLI counter tool');

// Subcommand: increment
program
    .command('increment')
    .description('Increase count by 1')
    .action(() => {
        const counter = getCounter();
        counter.count += 1;
        saveCounter(counter);
        console.log(`Count: ${counter.count}`);
    });

// Subcommand: decrement
program
    .command('decrement')
    .description('Decrease count by 1')
    .action(() => {
        const counter = getCounter();
        counter.count -= 1;
        saveCounter(counter);
        console.log(`Count: ${counter.count}`);
    });

// Subcommand: reset
program
    .command('reset')
    .description('Set count to 0')
    .action(() => {
        const counter = { count: 0 };
        saveCounter(counter);
        console.log(`Count: ${counter.count}`);
    });

// Subcommand: get
program
    .command('get')
    .description('Display current count')
    .action(() => {
        const counter = getCounter();
        console.log(`Count: ${counter.count}`);
    });

program.parse(process.argv);
