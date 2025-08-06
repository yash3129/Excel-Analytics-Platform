import React, { useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://excel-analytics-platform-jbt9.onrender.com/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`https://excel-analytics-platform-jbt9.onrender.com/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-purple-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-purple-300">Dashboard</a>
          <a href="#" className="block hover:text-purple-300">Users</a>
          <a href="#" className="block hover:text-purple-300">Reports</a>
          <a href="#" className="block hover:text-purple-300">Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6 text-purple-800">User Data</h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => alert("Edit feature coming soon!")}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
