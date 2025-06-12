
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';

// Load from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('taskState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Load state error:', err);
    return undefined;
  }
};

// Save to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('taskState', serializedState);
  } catch (err) {
    console.error('Save state error:', err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: {
    tasks: preloadedState?.tasks || { tasks: [] },
  },
});

// Subscribe to store changes and persist
store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;