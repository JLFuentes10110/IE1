import React from "react";
import "../App.css";

export default function TaskBox({ task, type }) {
  return (
    <div className={`task-box${task.priority === "high" ? " high" : ""}`}>
      {type === "main"
        ? `${task.priority === "high" ? "HP" : "R"}-${task.id}`
        : task.value}
    </div>
  );
}
