"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ManageCompanyLogos() {
  const [logos, setLogos] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLogos = async () => {
    try {
      const res = await axios.get("https://dworldsolution-backend.vercel.app/company-logos");
      setLogos(res.data);
    } catch (error) {
      console.error("Error fetching logos:", error);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleCloudinaryUpload = async () => {
    if (!logoFile) return null;

    const inputType = logoFile.type.split("/")[1];
    if (!["png", "jpeg", "jpg", "webp"].includes(inputType)) {
      toast.error("দয়া করে একটি বৈধ ছবি (jpg/png/webp) আপলোড করুন।");
      return null;
    }

    const uploadData = new FormData();
    uploadData.append("file", logoFile);
    
    // ⚠️ আপনার ক্লাউডিনারি ড্যাশবোর্ড থেকে সঠিক Unsigned Upload Preset নাম এখানে দিন
    uploadData.append("upload_preset", "qaajdm6b"); 

    try {
      const cloudName = "utb1wxrt"; 
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        uploadData
      );
      return res.data.secure_url; 
    } catch (error) {
      // ডিটেইলস এরর দেখার জন্য কনসোলে পুরো অবজেক্ট প্রিন্ট করা হলো
      console.error("Detailed Cloudinary Error:", error.response || error);
      toast.error(error.response?.data?.error?.message || "ক্লাউডিনারিতে ছবি আপলোড ব্যর্থ হয়েছে।");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!logoFile) {
      toast.error("দয়া করে একটি লোগো সিলেক্ট করুন।");
      return;
    }

    setLoading(true);
    const uploadedUrl = await handleCloudinaryUpload();

    if (!uploadedUrl) {
      setLoading(false);
      return;
    }

    try {
      await axios.post("https://dworldsolution-backend.vercel.app/company-logos", {
        logoUrl: uploadedUrl,
      });
      toast.success("নতুন লোগো সফলভাবে যোগ হয়েছে!");
      setLogoFile(null);
      e.target.reset();
      fetchLogos();
    } catch (error) {
      toast.error("লোগো সেভ করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("আপনি কি নিশ্চিত এই লোগোটি ডিলিট করতে চান?")) return;

    try {
      await axios.delete(`https://dworldsolution-backend.vercel.app/company-logos/${id}`);
      toast.success("লোগো ডিলিট সফল হয়েছে!");
      fetchLogos();
    } catch (error) {
      toast.error("ডিলিট করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Company Logos</h2>

      <form onSubmit={handleSubmit} className="mb-8 flex flex-col sm:flex-row gap-4 items-center bg-gray-800 p-4 rounded-lg">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          className="file-input file-input-bordered w-full max-w-xs bg-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-200 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Logo"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Existing Logos</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {logos.map((item) => (
          <div key={item._id} className="relative group bg-gray-800 p-3 rounded-lg flex flex-col items-center border border-gray-700">
            <img
              src={item.logoUrl}
              alt="Company Logo"
              className="w-16 h-16 object-cover rounded-full border border-gray-600 mb-2"
            />
            <button
              onClick={() => handleDelete(item._id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-xs rounded font-medium transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}