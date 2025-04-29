import React from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = React.useState([]);
  const [error, setError] = React.useState("");
  const [newTask, setNewTask] = React.useState("");

  const fetchData = () => {
    axios("https://task-app-33c3a-default-rtdb.firebaseio.com/tasks.json")
      .then((response) => {
        const data = response.data;
        if (data) {
          const tasksArray = Object.entries(data).map(([id, task]) => ({
            id,
            ...task,
          }));
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again later.");
      });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = { name: newTask.trim() };

    axios
      .post("https://task-app-33c3a-default-rtdb.firebaseio.com/tasks.json", task)
      .then(() => {
        setNewTask("");
        fetchData();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        setError("Failed to add task. Try again.");
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://task-app-33c3a-default-rtdb.firebaseio.com/tasks/${id}.json`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setError("Failed to delete task. Try again.");
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>📝 Task List</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={addTask} style={styles.form}>
          <input
            type="text"
            placeholder="Enter new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Add Task</button>
        </form>
        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.listItem}>
              {task.name}
              <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    margin: 0,
    padding: 0,
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  heading: {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    marginBottom: "20px",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  listItem: {
    padding: "10px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};
export default TaskList;
