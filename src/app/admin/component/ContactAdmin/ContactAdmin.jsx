"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    w_service: "",
    w_budget: "",
    project_desc: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get("https://dworldsolution-backend.vercel.app/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Only Update contact (POST off করা হয়েছে)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`https://dworldsolution-backend.vercel.app/contact/${editingId}`, formData);
        setEditingId(null);

        setFormData({
          client_name: "",
          client_email: "",
          w_service: "",
          w_budget: "",
          project_desc: "",
        });

        fetchContacts();
      } else {
        alert("❌ Admin can only update, not create new contacts!");
      }
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  };

  // ✅ Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axios.delete(`https://dworldsolution-backend.vercel.app/contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  // ✅ Edit contact
  const handleEdit = (contact) => {
    setFormData({
      client_name: contact.client_name,
      client_email: contact.client_email,
      w_service: contact.w_service,
      w_budget: contact.w_budget,
      project_desc: contact.project_desc,
    });
    setEditingId(contact._id);
  };

  return (
    <div className="min-h-screen p-6 text-gray-200 bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold text-center text-white">📋 Contact Admin Panel</h1>

      {/* Update Form */}
      <form onSubmit={handleSubmit} className="p-6 mb-8 bg-gray-800 rounded-lg shadow-md">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="client_name"
            placeholder="Client Name"
            value={formData.client_name}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="client_email"
            placeholder="Client Email"
            value={formData.client_email}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="w_service"
            placeholder="Service"
            value={formData.w_service}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="w_budget"
            placeholder="Budget"
            value={formData.w_budget}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="project_desc"
            placeholder="Project Description"
            value={formData.project_desc}
            onChange={handleChange}
            className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
          disabled={!editingId}
        >
          {editingId ? "Update Contact" : "Select a contact to update"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden bg-gray-800 rounded-lg">
          <thead>
            <tr className="text-gray-300 bg-gray-700">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Budget</th>
              <th className="px-4 py-3 text-left">Project Desc</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-2">{contact.client_name}</td>
                <td className="px-4 py-2">{contact.client_email}</td>
                <td className="px-4 py-2">{contact.w_service}</td>
                <td className="px-4 py-2">{contact.w_budget}</td>
                <td className="px-4 py-2">{contact.project_desc}</td>
                <td className="px-4 py-2 space-x-2 text-center">
                  <button onClick={() => handleEdit(contact)} className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(contact._id)} className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactAdmin;
