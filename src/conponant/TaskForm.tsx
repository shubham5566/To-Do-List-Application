// File: components/TaskForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../store/taskSlice';
// import { addTask } from '../store/tasksSlice';

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(
      addTask({
        id: uuidv4(),
        title,
        description,
        completed: false,
        dueDate,
      })
    );
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="max-w-2xl mx-auto rounded-xl shadow-lg p-6 md:p-10 space-y-6 border border-gray-300 backdrop-blur-sm bg-opacity-10"
>
  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
    Add New Task
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        Task Title
      </label>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-3 border border-gray-400 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        Due Date
      </label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full px-4 py-3 border border-gray-400 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
      Description
    </label>
    <textarea
      placeholder="Describe the task..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full h-32 px-4 py-3 border border-gray-400 rounded-lg resize-none bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="text-center">
    <button
      type="submit"
      className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
    >
      Add Task
    </button>
  </div>
</form>
  );
};

export default TaskForm;