import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const userEmail = "user@example.com"; // Replace with actual logged-in user email

  useEffect(() => {
    fetch(`/tasks?email=${userEmail}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    const response = await fetch(`/tasks/${id}`, { method: "DELETE" });
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== id));
    } else {
      console.error("Error deleting task");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">My Tasks</h1>
        <Link to="/add-task">
          <button className="btn btn-primary">+ Add Task</button>
        </Link>
      </div>

      {/* Task List Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Title</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No tasks found
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.category === "Done"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {task.category}
                    </span>
                  </td>
                  <td>{new Date(task.timestamp).toLocaleString()}</td>
                  <td className="flex gap-2">
                    <Link to={`/task/${task._id}`}>
                      <button className="btn btn-info btn-sm">View</button>
                    </Link>
                    <Link to={`/edit-task/${task._id}`}>
                      <button className="btn btn-warning btn-sm">Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
