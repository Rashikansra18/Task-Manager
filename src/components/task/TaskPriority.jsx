import React from 'react';
import clsx from 'clsx';
import { priorityColors } from '../../utils/priorityUtils';

export default function TaskPriority({ priority }) {
  return (
    <span
      className={clsx(
        'rounded-full px-2 py-1 text-xs font-medium',
        priorityColors[priority]
      )}
    >
      {priority}
    </span>
  );
}