
import './App.css'
import TaskForm from './conponant/TaskForm'
import TaskList from './conponant/TaskList'

function App() {


  return (
   <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
    To-Do List
  </h1>
      <TaskForm />
      <TaskList />
    </div>
  )
}

export default App
