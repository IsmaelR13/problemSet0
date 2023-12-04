import React, { useRef, useState, useEffect } from 'react';
let taskClicked = false;
let startedSession = false;
let breakTime = false;
const LemonTimer = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [isWorkSession, setIsWorkSession] = useState(true);
  let isWorkW;
  
  const [timer, setTimer] = useState(null);
  const [duration, setDuration] = useState({ work: 25, break: 5 });
  const inputRefW = useRef();
  const inputRefB = useRef();

  const startSession = (workSession) => {
    
    setIsWorkSession(workSession);
    const workTime = inputRefW.current;
    const breakTime = inputRefB.current;
    console.log(breakTime.value)
  
    startTimer(workSession ? workTime.value * 60 : breakTime.value * 60);
  };

  const startTimer = (seconds) => {
    setTimer(
      setInterval(() => {
        setDuration((prevDuration) => ({
          ...prevDuration,
          [isWorkW ? 'work' : 'break']: seconds,
        }));
        console.log(startedSession)
        if (seconds === 0) {
          clearInterval(timer);
          if (startedSession) {
            completeWorkSession();
            startedSession = false;
            breakTime = true;
            startSession(false); // Start break session
          } else {
            breakTime = false
          }
        }

        seconds--;
      }, 1000)
    );
  };

  const completeWorkSession = () => {
    isWorkW = false;
    if (currentTaskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex].sessionsCompleted += 1;
      
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      
    }
  };

  const addTask = (taskDescription) => {
    if (taskDescription) {
      const newTask = { description: taskDescription, sessionsCompleted: 0 };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      saveTasksToLocalStorage([...tasks, newTask]);
    }
  };

  const removeTask = () => {
    if (currentTaskIndex !== -1) {
      const updatedTasks = tasks.filter((_, index) => index !== currentTaskIndex);
      setTasks(updatedTasks);
      setCurrentTaskIndex(-1);
      saveTasksToLocalStorage(updatedTasks);
    }
  };

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskClick = () => {
    
    taskClicked = true;
    console.log(taskClicked)
  }


  
  return (
    <div>
      <h1>Lemon Timer</h1>
      <input
        id='taskInput'
        type="text"
        placeholder="Enter task description"
        onKeyDown={(e) => e.key === 'Enter' && addTask(e.target.value)}
      />
      <button onClick={() => addTask(document.querySelector('#taskInput').value)}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => [setCurrentTaskIndex(index), handleTaskClick()]}
            
            style={{
              cursor: 'pointer',
              border: index === currentTaskIndex ? '2px solid blue' : 'none',
            }}
          >
            {task.description} - Sessions Completed: {task.sessionsCompleted} {taskClicked && <button onClick={removeTask}>Remove Task</button>}
          </li>
        ))}
      </ul>
    
      {taskClicked && <label>work interval (minutes):</label>}

      {taskClicked && <input 
        type="text"
        ref = {inputRefW}
        defaultValue = '25'
      
      
      />} 

      {taskClicked && <label>break interval (minutes):</label>}
      {taskClicked && <input
        type="text"
        ref = {inputRefB}
        defaultValue = '5'
        
      />}

      {taskClicked && <button onClick={() => [startSession(true), startedSession = true, isWorkW = true]}>Start Work Session</button> }

      {startedSession && 
      <div>
        <div>{'Work Session'}</div>
        <div>
          {Math.floor(duration['work'] / 60)}:
          {duration['work'] % 60 < 10 ? '0' : ''}
          {duration['work'] % 60}
        </div>
      </div>}
      {breakTime &&
      <div>
        <div>{'Break Session'}</div>
        <div>
          {Math.floor(duration['break'] / 60)}:
          {duration['break'] % 60 < 10 ? '0' : ''}
          {duration['break'] % 60}
        </div>
      </div>}
    </div>
  );
};

export default LemonTimer;

