const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'tasks.json');

// Helper to read tasks from disk
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

// Helper to save tasks to disk
function saveTasks(tasks) {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
}

// Commands logic
const args = process.argv.slice(2);
const command = args[0];

const tasks = loadTasks();

if (command === 'add') {
    const description = args.slice(1).join(' ');
    if (!description) {
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
    tasks.forEach(task => {
        const status = task.completed ? '[x]' : '[ ]';
        console.log(`${task.id}: ${status} ${task.description}`);
    });
} else if (command === 'complete') {
    const id = parseInt(args[1]);
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        saveTasks(tasks);
        console.log(`Task ${id} marked complete.`);
    }
} else if (command === 'delete') {
    const id = parseInt(args[1]);
    const filteredTasks = tasks.filter(t => t.id !== id);
    if (filteredTasks.length !== tasks.length) {
        saveTasks(filteredTasks);
        console.log(`Task ${id} deleted.`);
    }
} else {
    // Unsupported command or no command provided
}
