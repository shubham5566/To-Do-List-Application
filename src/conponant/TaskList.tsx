// File: components/TaskList.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { deleteTask, toggleTask } from '../store/taskSlice';


const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
   <div className="mt-6 w-full">
  {/* Filter Buttons */}
  <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
    <button
      onClick={() => setFilter('all')}
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
    >
      All
    </button>
    <button
      onClick={() => setFilter('completed')}
      className="px-4 py-2 bg-green-200 hover:bg-green-300 rounded text-sm font-medium"
    >
      Completed
    </button>
    <button
      onClick={() => setFilter('pending')}
      className="px-4 py-2 bg-yellow-200 hover:bg-yellow-300 rounded text-sm font-medium"
    >
      Pending
    </button>
  </div>

  {/* Stats */}
  <p className="mb-4 text-center sm:text-left text-sm text-gray-700 dark:text-gray-300">
    Completed: {completedCount} | Pending: {pendingCount}
  </p>

  {/* Task List */}
  <ul className="space-y-4">
    {filteredTasks.map((task) => (
      <li
        key={task.id}
        className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-gray-50 dark:bg-gray-800"
      >
        <div className="flex-1">
          <h3
            className={`text-base font-semibold break-words ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{task.description}</p>
          {task.dueDate && (
            <p className="text-xs text-gray-500 dark:text-gray-400">Due: {task.dueDate}</p>
          )}
        </div>

        <div className="flex-shrink-0 flex gap-2 self-end sm:self-auto">
          <button
            onClick={() => dispatch(toggleTask(task.id))}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => dispatch(deleteTask(task.id))}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default TaskList;