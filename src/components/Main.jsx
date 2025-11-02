import { Settings, Plus, RotateCcw, Play, Pause } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";
const Main = () => {
  const [listPriority, setlistPriority] = useState("medium");
  const priorityClasses = {
    low: "low-priority",
    medium: "med-priority",
    high: "high-priority",
  };

  //console.log(tasks);

  const [totalTasks, setTotalTasks] = useState(() => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
  });

  const [taskInput, setTaskInput] = useState("");

  function handleTaskInput(e) {
    setTaskInput(e.target.value);
  }

  function handleAddBtnClick(e) {
    if (taskInput) {
      let newTask = [...totalTasks];
      newTask.push([taskInput, listPriority, false]); //false here is an answer for isCompleted?
      setTotalTasks(newTask);
      setTaskInput("");
    }
  }
  let [completedTasks, setCompletedTasks] = useState(0);
  useEffect(() => {
    setCompletedTasks(0);
    let comptask = 0;
    console.log("Updated totalTasks:", totalTasks);
    totalTasks.forEach((elm) => {
      if (elm[2] === true) {
        comptask++;
      }
    });
    setCompletedTasks(comptask);
    localStorage.setItem("tasks", JSON.stringify(totalTasks));
  }, [totalTasks]);

  const [filter, setFilter] = useState("All");
  const [timerMode, setTimerMode] = useState("focus");
  const AllTimerModes = {
    focus: "Focus",
    break: "Break",
    longBreak: "Long Break",
  };

  // timer logic
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timerId = useRef(null);
  const [defaultPomSettings, setDefaultPom] = useState({
    focus: "25 : 00",
    break: "05 : 00",
    longBreak: "15 : 00",
  });
  const [pomoTimer, setPomoTimer] = useState(defaultPomSettings[timerMode]);

  useEffect(() => {
    if (isTimerRunning) {
      timerId.current = setInterval(() => {
        setPomoTimer((prev) => {
          const [m, s] = prev.trim().split(":").map(Number);
          let totalSeconds = m * 60 + s - 1;

          if (totalSeconds < 0) {
            clearInterval(timerId.current);
            setIsTimerRunning(false);
            return "00 : 00";
          }

          const min = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
          const sec = String(totalSeconds % 60).padStart(2, "0");
          return `${min} : ${sec}`;
        });
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current);
  }, [isTimerRunning]);

  function handleTimerStartBtnClickEvent() {
    if (pomoTimer != "00 : 00") setIsTimerRunning((prev) => !prev);
  }

  return (
    <main className="main-container">
      <div className="pomodoro-container main-grid-item">
        <div className="pomo-header-container">
          <div className="pomo-buttons">
            {["focus", "break", "longBreak"].map((elem) => {
              return (
                <h4
                  key={elem}
                  className={`pomo-btn-item ${
                    elem === timerMode ? "pomo-btn-item-active" : ""
                  }`}
                  onClick={() => {
                    setTimerMode(elem);

                    if (elem !== timerMode) {
                      setIsTimerRunning(false);
                      setPomoTimer(defaultPomSettings[elem]);
                    }
                  }}
                >
                  {AllTimerModes[elem]}
                </h4>
              );
            })}
          </div>
          <button className="pomo-settings">
            <Settings strokeWidth={2.25} size={16} />
          </button>
        </div>

        <div className="flex-container-for-pomo">
          <div className="pomo-timer-container">
            <h4 className="pomo-timer">{pomoTimer}</h4>
            <p>{AllTimerModes[timerMode]}</p>
          </div>

          <div className="pomo-controls">
            <button
              className={`start-btn pomo-ctrl-btn ${
                isTimerRunning ? "pause-timer-mode" : ""
              }`}
              onClick={handleTimerStartBtnClickEvent}
            >
              {isTimerRunning ? (
                <Pause strokeWidth={2.5} size={18} />
              ) : (
                <Play strokeWidth={2.5} size={18} />
              )}
              <span>{isTimerRunning ? "Pause" : "Start"}</span>
            </button>
            <button
              className="reset-btn pomo-ctrl-btn"
              onClick={() => {
                clearInterval(timerId.current);
                setIsTimerRunning(false);
                setPomoTimer(defaultPomSettings[timerMode]);
              }}
            >
              <RotateCcw strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <div className="todo-container main-grid-item">
        <div className="todo-heading">
          <div>
            <h2>Tasks </h2>
            <p>
              {completedTasks} of {totalTasks.length} tasks completed
            </p>
          </div>
          <div className="progress-bar">
            <div
              style={{
                width:
                  totalTasks.length === 0
                    ? "0%"
                    : `${(completedTasks / totalTasks.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="todo-inputter">
          <input
            value={taskInput}
            onChange={handleTaskInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddBtnClick();
              }
            }}
            type="text"
            placeholder="Add a new task..."
          />
          <button onClick={handleAddBtnClick}>
            <Plus strokeWidth={2.25} size={16} />{" "}
          </button>
        </div>
        <div className="todo-priority-container">
          {["low", "medium", "high"].map((priority) => {
            return (
              <h4
                key={priority}
                className={`todo-priority-item ${
                  listPriority === priority ? priorityClasses[priority] : ""
                }`}
                onClick={() => setlistPriority(priority)}
              >
                {priority}
              </h4>
            );
          })}
        </div>
        <div className="todo-filter-btns">
          {["All", "Active", "Completed"].map((elem) => {
            return (
              <h4
                key={elem.toLowerCase()}
                className={`todo-filter-btn-item ${
                  elem === filter ? "filter-active" : ""
                }`}
                onClick={() => setFilter(elem)}
              >
                {elem}
              </h4>
            );
          })}
        </div>
        <div className="todo-list">
          {totalTasks.length === 0 ? (
            <>
              <p className="no-tasks-msg">No tasks yet. Add one above!</p>
            </>
          ) : (
            totalTasks.map((elem, i) => {
              //console.log(filter.toLowerCase() == "active");
              if (filter.toLowerCase() == "active") {
                if (elem[2] === false) {
                  return (
                    <TodoItem
                      key={i}
                      task={elem[0]}
                      isCompleted={elem[2]}
                      priority={elem[1]}
                      totalTasks={totalTasks}
                      handleNewTask={setTotalTasks}
                      index={i}
                    ></TodoItem>
                  );
                }
              } else if (filter.toLowerCase() == "completed") {
                if (elem[2] === true) {
                  return (
                    <TodoItem
                      key={i}
                      task={elem[0]}
                      isCompleted={elem[2]}
                      priority={elem[1]}
                      totalTasks={totalTasks}
                      handleNewTask={setTotalTasks}
                      index={i}
                    ></TodoItem>
                  );
                }
              } else {
                return (
                  <TodoItem
                    key={i}
                    task={elem[0]}
                    isCompleted={elem[2]}
                    priority={elem[1]}
                    totalTasks={totalTasks}
                    handleNewTask={setTotalTasks}
                    index={i}
                  ></TodoItem>
                );
              }
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
