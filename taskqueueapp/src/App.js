import React from "react";
import "./App.css";
import SetTimeOutExample from "./SetTimeOutExample";
import TaskBox from "./Components/TaskBox";
import TaskQueuePanel from "./Components/TaskQueuePanel";
import useTaskScheduler from "./Components/TaskScheduler";

export default function App() {
  const {
    queue,
    highQueues,
    regularQueues,
    addRandomTask,
    admitTask,
    addHighQueue,
    addRegularQueue,
    handleDone
  } = useTaskScheduler();

  return (
    <div className="container">
      <div className="app-container">
        {/* LEFT SIDE */}
        <div className="main-area">
          <button onClick={addRandomTask}>ADD RANDOM TASK</button>
          <h2 style={{ marginTop: 16 }}>Task Queue</h2>
          <div className="queue-list">
            {queue.map(task => (
              <TaskBox key={task.id} task={task} type="main" />
            ))}
          </div>
          <button onClick={admitTask} style={{ marginTop: 16 }}>
            ADMIT TASK
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="side-queues">
          <div className="queue-controls">
            <button onClick={addHighQueue}>+ High Priority Queue</button>
            <button onClick={addRegularQueue} style={{ marginLeft: 8 }}>
              + Regular Queue
            </button>
          </div>

          {highQueues.map((queue, idx) => (
            <TaskQueuePanel
              key={`high-${idx}`}
              title={`High Priority Queue ${idx + 1}`}
              queue={queue}
              queueType="high"
              idx={idx}
              handleDone={handleDone}
              SetTimeOutExample={SetTimeOutExample}
            />
          ))}

          {regularQueues.map((queue, idx) => (
            <TaskQueuePanel
              key={`regular-${idx}`}
              title={`Regular Queue ${idx + 1}`}
              queue={queue}
              queueType="regular"
              idx={idx}
              handleDone={handleDone}
              SetTimeOutExample={SetTimeOutExample}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
