import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hook/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, submitRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTask = (taskObjs) => {
      const loadedTasks = [];

      for (const taskKey in taskObjs) {
        loadedTasks.push({ id: taskKey, text: taskObjs[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-http-fafa3-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
