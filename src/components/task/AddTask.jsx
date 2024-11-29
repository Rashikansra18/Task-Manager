import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import TaskForm from './TaskForm';

export default function AddTask() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      completed: false,
      subtasks: [],
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-gray-600 hover:border-gray-400 hover:text-gray-700"
      >
        <Plus size={20} />
        <span>Add new task</span>
      </button>
    );
  }

  return (
    <div className="mb-6">
      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
        onSubmit={handleSubmit}
        onCancel={() => setIsOpen(false)}
      />
    </div>
  );
}