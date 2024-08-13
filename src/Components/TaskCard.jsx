import PropTypes from "prop-types";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskCard({ task }) {
  const context = useContext(TaskContext);
  const handleDelete = () => {
    context.deleteTask(task.id);
  };

  const handleDone = () => {
    context.updateTask(task.id, task.done);
  };
  return (
    <div>
      <h1> {task.name} </h1>
      <p>{JSON.stringify(task.done)}</p>
      <div>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleDone}>Done</button>
      </div>
    </div>
  );
}
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TaskCard;
