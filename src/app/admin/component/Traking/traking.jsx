'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics').then(res => setData(res.data));
  },[]);

  const exportCSV = () => {
    const header = ["Country", "City", "Page", "Referrer", "Time"];
    const csv =[header, ...data.map(d => [d.country, d.city, d.page, d.referrer, d.timestamp])].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'analytics.csv'; a.click();
  };

  const handleCleanup = async () => {
    if(confirm("Are you sure to delete 1 month old data?")) {
        await axios.post('http://localhost:5000/api/cleanup');
        window.location.reload();
    }
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Marketing Intelligence</h1>
      <div className="flex gap-4 mb-6">
        <input placeholder="Search Country..." className="p-2 bg-gray-800 rounded text-white" onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={exportCSV} className="bg-blue-600 px-4 py-2 rounded">Export CSV</button>
        <button onClick={handleCleanup} className="bg-red-600 px-4 py-2 rounded">Clear Old Data</button>
      </div>

      <table className="w-full text-left bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr><th className="p-4">Country</th><th className="p-4">City</th><th className="p-4">Referrer</th><th className="p-4">Time</th></tr>
        </thead>
        <tbody>
          {data.filter(d => d.country.toLowerCase().includes(searchTerm.toLowerCase())).map((d, i) => (
            <tr key={i} className="border-t border-gray-700">
              <td className="p-4">{d.country}</td>
              <td className="p-4">{d.city}</td>
              <td className="p-4">{d.referrer}</td>
              <td className="p-4">{new Date(d.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}