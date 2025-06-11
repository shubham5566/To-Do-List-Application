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
    <div className="mt-6">
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setFilter('all')} className="px-3 py-1 bg-gray-200 rounded">All</button>
        <button onClick={() => setFilter('completed')} className="px-3 py-1 bg-green-200 rounded">Completed</button>
        <button onClick={() => setFilter('pending')} className="px-3 py-1 bg-yellow-200 rounded">Pending</button>
      </div>

      <p className="mb-4">Completed: {completedCount} | Pending: {pendingCount}</p>

      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li key={task.id} className="p-4 border rounded flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
              <p className="text-sm text-gray-700">{task.description}</p>
              {task.dueDate && <p className="text-xs text-gray-500">Due: {task.dueDate}</p>}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => dispatch(toggleTask(task.id))}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="px-2 py-1 bg-red-500 text-white rounded"
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