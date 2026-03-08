# Task Manager CLI

A lightweight, zero-dependency Node.js command-line application for managing daily tasks.

## Features

- **Add Tasks**: Quickly record tasks with descriptions.
- **List Tasks**: View all your current tasks and their status.
- **Complete Tasks**: Mark tasks as finished.
- **Delete Tasks**: Remove tasks you no longer need.
- **Local Storage**: All data is stored in a `tasks.json` file in the same directory.

## Installation

Ensure you have Node.js installed. Clone this repository and navigate to the project folder.

## Usage

Run the following commands using Node.js:

### Add a New Task
```bash
node task_manager.js add "Complete the project documentation"
```

### List All Tasks
```bash
node task_manager.js list
```

### Mark a Task as Complete
```bash
node task_manager.js complete 1
```

### Delete a Task
```bash
node task_manager.js delete 1
```

---
*Created by Style-01 Specialist.*
