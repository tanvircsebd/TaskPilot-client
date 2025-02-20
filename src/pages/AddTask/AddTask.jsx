import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddTask = () => {
  const { id } = useParams(); // For edit mode
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    timestamp: new Date().toISOString(),
  });

  const [error, setError] = useState("");

  // Fetch existing task if in edit mode
  useEffect(() => {
    if (id) {
      fetch(`/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => setTask(data))
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > 50) return;
    if (name === "description" && value.length > 200) return;

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!task.title) {
      setError("Title is required (max 50 characters).");
      return;
    }

    const url = id ? `/tasks/${id}` : "/tasks";
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      navigate("/");
    } else {
      setError("Failed to save task. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4">
        {id ? "Edit Task" : "Add New Task"}
      </h1>

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        {/* Title Input */}
        <div>
          <label className="block text-lg font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength="50"
            className="input input-bordered w-full"
            required
          />
          <p className="text-sm text-gray-500">
            {task.title.length}/50 characters
          </p>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-lg font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength="200"
            className="textarea textarea-bordered w-full"
          ></textarea>
          <p className="text-sm text-gray-500">
            {task.description.length}/200 characters
          </p>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-lg font-medium mb-1">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          {id ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
