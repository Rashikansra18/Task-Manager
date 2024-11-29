import React from 'react';
import { formatDate } from '../../utils/dateUtils';

export default function TaskDueDate({ date }) {
  if (!date) return null;
  
  return (
    <span className="text-xs text-gray-500">
      Due: {formatDate(date)}
    </span>
  );
}