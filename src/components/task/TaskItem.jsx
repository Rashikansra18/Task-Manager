import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import TaskPriority from './TaskPriority';
import TaskDueDate from './TaskDueDate';
import clsx from 'clsx';

export default function TaskItem({ task }) {
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
          <TaskPriority priority={task.priority} />
          <TaskDueDate date={task.dueDate} />
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