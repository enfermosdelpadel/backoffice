import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
function TaskFrom() {
  const [taskName, setTaskName] = useState("");
  const context = useContext(TaskContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    context.createTask(taskName);
    setTaskName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="taskName"
          placeholder="Whire a task name"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default TaskFrom;
