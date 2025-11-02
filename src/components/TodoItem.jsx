import untickedCircle from "../assets/circle.svg";
import tickedCircle from "../assets/tick_circle.svg";
import deleteIcon from "../assets/trash.svg";
const TodoItem = ({
  task,
  priority,
  isCompleted,
  handleNewTask,
  index,
  totalTasks,
}) => {
  const priorityClassesForLabel = {
    low: "low-todoitem-label",
    medium: "mid-todoitem-label",
    high: "high-todoitem-label",
  };
  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <img
          height={"14px"}
          width={"auto"}
          style={isCompleted ? { opacity: 0.5 } : {}}
          src={isCompleted ? tickedCircle : untickedCircle}
          alt="todo-list radio button"
          className="circle-todo-btn"
          onClick={() => {
            let newList = [...totalTasks];
            newList[index][2] = !newList[index][2];
            handleNewTask(newList);
          }}
        />
        <p className={isCompleted ? "strike-task-item" : ""}>{task}</p>
      </div>
      <div className="todo-item-right">
        <h4
          className={`todo-item-label ${priorityClassesForLabel[priority]}`}
          style={{ cursor: "default" }}
        >
          {priority}
        </h4>

        {/* delete task icon */}
        <img
          height={"15px"}
          width={"auto"}
          src={deleteIcon}
          alt="delete item icon"
          onClick={() => {
            let newList = totalTasks.filter((_, i) => i !== index);
            handleNewTask(newList);
          }}
        />
      </div>
    </div>
  );
};

export default TodoItem;
