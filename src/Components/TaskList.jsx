import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const context = useContext(TaskContext);

  if (context.tasks.length === 0) {
    return <p>No tasks found</p>;
  } else {
    return (
      <div>
        {context.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    );
  }
};

export default TaskList;
