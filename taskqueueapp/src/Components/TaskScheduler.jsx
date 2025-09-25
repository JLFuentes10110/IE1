import { useState } from "react";

export default function useTaskScheduler() {
  const [queue, setQueue] = useState([]);
  const [highQueues, setHighQueues] = useState([[]]);
  const [regularQueues, setRegularQueues] = useState([[], [], [], []]);
  const [taskId, setTaskId] = useState(1);

  function addRandomTask() {
    const isHigh = Math.random() < 0.3;
    setQueue(q => [
      ...q,
      {
        id: taskId,
        value: Math.floor(Math.random() * 200) + 1,
        priority: isHigh ? "high" : "regular",
        duration: Math.floor(Math.random() * 10) + 5
      }
    ]);
    setTaskId(id => id + 1);
  }

  function admitTask() {
    if (queue.length === 0) return;
    const [task, ...rest] = queue;
    setQueue(rest);

    if (task.priority === "high") {
      const idx = findShortestQueue(highQueues);
      setHighQueues(queues =>
        queues.map((q, i) => (i === idx ? [...q, task] : q))
      );
    } else {
      const idx = findShortestQueue(regularQueues);
      setRegularQueues(queues =>
        queues.map((q, i) => (i === idx ? [...q, task] : q))
      );
    }
  }

  function handleDone(queueType, idx, taskId) {
    if (queueType === "high") {
      setHighQueues(queues =>
        queues.map((q, i) => (i === idx ? q.filter(t => t.id !== taskId) : q))
      );
    } else {
      setRegularQueues(queues =>
        queues.map((q, i) => (i === idx ? q.filter(t => t.id !== taskId) : q))
      );
    }
  }

  function addHighQueue() {
    setHighQueues(qs => [...qs, []]);
  }

  function addRegularQueue() {
    setRegularQueues(qs => [...qs, []]);
  }

  function findShortestQueue(queues) {
    return queues.reduce((minIdx, q, i, arr) => {
      const sum = q.reduce((acc, t) => acc + t.duration, 0);
      const minSum = arr[minIdx].reduce((acc, t) => acc + t.duration, 0);
      return sum < minSum ? i : minIdx;
    }, 0);
  }

  return {
    queue,
    highQueues,
    regularQueues,
    addRandomTask,
    admitTask,
    addHighQueue,
    addRegularQueue,
    handleDone
  };
}
