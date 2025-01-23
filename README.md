# Peakflo Board - Task Management Application

A modern task management board built with React, TypeScript, and Vite. Features drag-and-drop functionality, persistent storage, and a clean user interface.

## Features

- Drag and drop tasks between columns
- Create and manage custom status columns
- Add and edit tasks with titles and descriptions
- Persistent storage using `localStorage`
- Responsive design
- Real-time updates

## Tech Stack

- React 18
- TypeScript
- Vite
- Redux for state management
- DND Kit for drag and drop
- TailwindCSS for styling
- UUID for unique identifiers

## UI

<img width="1678" alt="Screenshot 2025-01-24 at 1 19 29 AM" src="https://github.com/user-attachments/assets/e1a0f01f-1697-4454-8d69-28768a646925" />

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/shreyansh232/Assignment-Peakflo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Assignment-Peakflo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the application.

## How to Use

- **Add a Column**: Click the "Add New Status Board" button to create a new column.
- **Add a Task**: Click the "Add Task" button within a column to create a new task.
- **Edit a Task**: Click on a task to open the task dialog, where you can edit the title and description.
- **Drag and Drop**: Drag tasks between columns to update their status.
- **Persistent Storage**: All tasks and columns are saved to `localStorage` and will persist across page reloads.

## Folder Structure

```
/src
|-- /components        # Reusable UI components
|-- /store             # Redux store and actions
|-- /types             # TypeScript type definitions
|-- /utils             # Utility functions
|-- App.tsx            # Main application component
|-- main.tsx           # Entry point
```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Let me know if you need further adjustments! 😊



