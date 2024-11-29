import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { GripVertical, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Task } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';
import clsx from 'clsx';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTaskStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'group flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm transition-all',
        task.completed && 'opacity-75'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </button>

      <button
        onClick={() => updateTask(task.id, { completed: !task.completed })}
        className="text-gray-400 hover:text-gray-600"
      >
        {task.completed ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle size={20} />
        )}
      </button>

      <div className="flex-1">
        <h3
          className={clsx(
            'text-lg font-medium',
            task.completed && 'line-through'
          )}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-1 text-sm text-gray-600">{task.description}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={clsx(
              'rounded-full px-2 py-1 text-xs font-medium',
              priorityColors[task.priority]
            )}
          >
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="invisible text-gray-400 hover:text-red-500 group-hover:visible"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}