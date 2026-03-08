# Task Manager CLI Documentation

## Installation
To use the Task Manager CLI, ensure you have Node.js installed on your system.

1. Clone the repository.
2. Navigate to the project directory.
3. No external dependencies are required as it uses native Node.js modules.

## Usage Examples

### Adding a Task
To add a new task, use the `add` command followed by the task description:
```bash
node task_manager.js add "Finish the report"
```

### Listing Tasks
To see all tasks and their status:
```bash
node task_manager.js list
```

### Completing a Task
To mark a task as completed, use the `complete` command with the task ID:
```bash
node task_manager.js complete 1
```

### Deleting a Task
To remove a task from the list:
```bash
node task_manager.js delete 1
```

## API Details (Internal)

### Data Persistence
Tasks are stored in a `tasks.json` file in the same directory as the script. The structure of each task object is:
- `id`: Unique integer identifier.
- `description`: String describing the task.
- `completed`: Boolean indicating the task status.

### Core Functions
- `loadTasks()`: Reads and parses the `tasks.json` file. Returns an empty array if the file is missing or corrupt.
- `saveTasks(tasks)`: Stringifies the task array and writes it to `tasks.json`.
