import React from "react";
import TaskBox from "./TaskBox";
import "../App.css";

export default function TaskQueuePanel({
  title,
  queue,
  queueType,
  idx,
  handleDone,
  SetTimeOutExample
}) {
  const currentTask = queue[0];
  const waitingTasks = queue.slice(1);

  return (
    <div
      className={`queue-panel${queueType === "high" ? " high-priority" : ""}`}
    >
      <div className="queue-title">{title}</div>
      <div>Queue List:</div>
      <div className="queue-list">
        {waitingTasks.map(task => (
          <TaskBox key={task.id} task={task} type="queue" />
        ))}
      </div>
      <div className="current-task-id" style={{ textAlign: "left" }}>
        {currentTask && <span>{currentTask.value}</span>}
      </div>
      <div>Duration:</div>
      <div className="duration-bar-container">
        {currentTask && (
<SetTimeOutExample
  key={currentTask.id}
  initialWidth={150} // static length (always the same)
  step={150 / currentTask.duration} // dynamic speed based on duration
  onDone={() => handleDone(queueType, idx, currentTask.id)}
  barColor={queueType === "high" ? "#f00" : "#2ecc40"}
/>
        )}
      </div>
    </div>
  );
}
