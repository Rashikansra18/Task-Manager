import React from 'react';
import { CheckSquare } from 'lucide-react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <CheckSquare size={32} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;