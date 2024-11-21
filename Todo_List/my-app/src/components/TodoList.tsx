"use client";

import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiTrash2, FiPlus } from "react-icons/fi";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Check if all tasks are completed to show the popup
  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    }
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-gray-200 overflow-hidden">
      {/* Rain Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="rain"></div>
      </div>

      {/* Header */}
        <header className="w-full py-6 bg-gradient-to-r from-blue-300 to-purple-300 shadow-lg z-10 relative">
          <h1 className="text-4xl font-bold text-center text-white">
            My ToDo <span className="text-indigo-600">App</span>
          </h1>
        </header>

      {/* Main Container */}
      <div className="flex justify-center items-center pt-8">
      <div className="mt-10 p-8 bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl relative z-10">
        {/* Statistics */}
        <div className="mb-6 flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow">
          <p className="text-sm font-semibold">Total Tasks: {totalTasks}</p>
          <p className="text-sm text-green-400">Completed: {completedTasks}</p>
          <p className="text-sm text-red-400">Remaining: {remainingTasks}</p>
        </div>

        {/* Input Area */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTask}
            className="ml-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-3 rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <FiPlus size={20} />
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`mr-4 p-2 rounded-full ${
                    task.completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-600 text-gray-400"
                  }`}
                >
                  <FiCheckCircle size={20} />
                </button>
                <span
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none transition-all"
              >
                <FiTrash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg text-center animate-bounce">
            <h2 className="text-2xl font-bold mb-2">🎉 Congratulations! 🎉</h2>
            <p>You have completed all your tasks!</p>
          </div>
        </div>
      )}

      {/* CSS for Rain Effect */}
      <style>{`
  .rain {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 1px 200px;
    animation: rain 1s linear infinite;
  }
    @keyframes rain {
          to {
            background-position: 0px 200px;
          }
        }
`}</style>
    </div>
  );
};

export default TodoApp;
