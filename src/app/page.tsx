"use client"
import { useState, useEffect } from 'react';
import Task from './components/add_task';

interface Task {
  id: number;
  name: string;
  date: string;
  time: string;
  status: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      date: taskDate,
      time: taskTime,
      status: 'queue'
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDate('');
    setTaskTime('');
  };

  const moveTask = (id: number, status: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <Task key={task.id} task={task} onMove={moveTask} />
      ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task Name"
          className="border p-2 rounded mr-2 text-black	"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded mr-2 text-black	"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <input
          type="time"
          className="border p-2 rounded mr-2 text-black	"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Queue</h2>
          {renderTasks('queue')}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Process</h2>
          {renderTasks('process')}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Finish</h2>
          {renderTasks('finish')}
        </div>
      </div>
    </div>
  );
};

export default Home;
