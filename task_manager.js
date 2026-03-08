/**
 * Task Manager CLI
 * 
 * A simple command-line tool to manage your tasks.
 */

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'tasks.json');

/**
 * Loads tasks from the local JSON database file.
 * 
 * @returns {Array<{id: number, description: string, completed: boolean}>} The list of tasks.
 */
function loadTasks() {
    if (!fs.existsSync(DB_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file is corrupt, return empty and overwrite on next save
        return [];
    }
}

/**
 * Saves the provided task list to the local JSON database file.
 * 
 * @param {Array<{id: number, description: string, completed: boolean}>} tasks - The task list to save.
 */
function saveTasks(tasks) {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

/**
 * Prints the usage banner for the CLI.
 */
function printUsage() {
    console.log('\n--- Task Manager CLI Usage ---');
    console.log('  node task_manager.js add <description>  - Add a new task');
    console.log('  node task_manager.js list               - List all tasks');
    console.log('  node task_manager.js complete <id>      - Mark a task as complete');
    console.log('  node task_manager.js delete <id>        - Delete a task');
    console.log('-------------------------------\n');
}

// Main execution
const args = process.argv.slice(2);
const command = args[0];

const tasks = loadTasks();

if (command === 'add') {
    const description = args.slice(1).join(' ');
    if (!description) {
        console.error('Error: Please provide a task description.');
        process.exit(1);
    }
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        description: description,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added: ${newTask.id}`);
} else if (command === 'list') {
    if (tasks.length === 0) {
        console.log('No tasks found.');
    } else {
        console.log('\nYour Tasks:');
        tasks.forEach(task => {
            const status = task.completed ? '[x]' : '[ ]';
            console.log(`${task.id}: ${status} ${task.description}`);
        });
        console.log('');
    }
} else if (command === 'complete') {
    const id = parseInt(args[1], 10);
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        saveTasks(tasks);
        console.log(`Task ${id} marked complete.`);
    } else {
        console.error(`Error: Task with ID ${args[1]} not found.`);
    }
} else if (command === 'delete') {
    const id = parseInt(args[1], 10);
    const filteredTasks = tasks.filter(t => t.id !== id);
    if (filteredTasks.length !== tasks.length) {
        saveTasks(filteredTasks);
        console.log(`Task ${id} deleted.`);
    } else {
        console.error(`Error: Task with ID ${args[1]} not found.`);
    }
} else {
    printUsage();
}
