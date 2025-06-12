import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTask } from '../store/taskSlice';

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
      className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md bg-white dark:bg-gray-900 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-50 space-y-6"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">
        Add New Task
      </h2>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          placeholder="Describe the task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[100px] md:min-h-[120px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}
      <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 text-center"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;