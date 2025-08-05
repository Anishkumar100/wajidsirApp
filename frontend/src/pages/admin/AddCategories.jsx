import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppProvider";

export const AddCategories = () => {
  const { axios } = useAppContext();

  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch categories on mount
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/category/all");
      if (data.success) setCategories(data.categories);
      else toast.error("Failed to fetch categories");
    } catch (err) {
      toast.error(err.message || "Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      return toast.error("Category name cannot be empty");
    }
    try {
      setLoading(true);
      const { data } = await axios.post("/api/category/add", { name: newCategoryName });
      if (data.success) {
        toast.success("Category added");
        setNewCategoryName("");
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to add category");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Start editing a category
  const startEditing = (id, name) => {
    setEditingId(id);
    setEditingName(name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  // Save edited category
  const handleEditCategory = async (id) => {
    if (!editingName.trim()) {
      return toast.error("Category name cannot be empty");
    }
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/category/update/${id}`, { name: editingName });
      if (data.success) {
        toast.success("Category updated");
        setEditingId(null);
        setEditingName("");
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to update category");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Blog Categories</h2>

      {/* Add new category */}
      <form onSubmit={handleAddCategory} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {/* Category list */}
      <div className="bg-white shadow rounded p-4">
        {loading && !categories.length ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map(({ _id, name }) => (
              <li key={_id} className="flex items-center justify-between py-2">
                {editingId === _id ? (
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-grow border border-gray-300 rounded px-2 py-1 mr-2"
                      disabled={loading}
                    />
                    <button
                      onClick={() => handleEditCategory(_id)}
                      disabled={loading}
                      className="text-green-600 hover:underline mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={loading}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{name}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEditing(_id, name)}
                        className="text-blue-600 hover:underline"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(_id)}
                        className="text-red-600 hover:underline"
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};
