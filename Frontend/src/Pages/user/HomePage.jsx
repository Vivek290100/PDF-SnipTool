// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Frontend\src\components\HomePage.tsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { commonRequest } from "../../utlis/commonRequest";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await commonRequest("POST", "/logout", {}, { withCredentials: true });
      localStorage.removeItem("userInfo");
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        text: "Please try again later.",
        showConfirmButton: true,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Log each key-value pair in the FormData object
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await commonRequest("POST", "/upload", formData, {
        "Content-Type": "multipart/form-data",
      });

      console.log(response, "response here");

      if (response.status === 201) {
        toast.success("File uploaded successfully!");
      } else {
        toast.error(response.data.message || "Failed to upload the file.");
      }
    } catch (error) {
      toast.error("Failed to upload the file.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-gray-200 bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-800/60 backdrop-blur-lg h-full p-4 text-gray-200 border-r border-gray-700/50 transition-transform duration-300 ease-in-out transform md:translate-x-0 fixed md:relative z-50`}
      >
        <div className="flex flex-col items-center">
          <nav className="flex flex-col w-full">
            <NavLink
              to="/home"
              className="flex items-center px-4 py-2 mb-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300"
            >
              <FaHome className="mr-3" /> Home
            </NavLink>

            <NavLink
              to="/documents"
              className="flex items-center px-4 py-2 mb-2 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300"
            >
              <FaUser className="mr-3" /> Documents
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 mt-auto text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300"
            >
              <FaSignOutAlt className="mr-3" /> Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-900/50">
        <h1 className="text-3xl font-bold mb-4 text-white bg-gradient-to-r from-slate-200 via-gray-300 to-slate-400 bg-clip-text text-transparent animate-fade-in">
          Upload Your PDF
        </h1>

        {/* PDF Upload Form */}
        <form
          onSubmit={handleFileUpload}
          className="flex flex-col items-center"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mb-4 p-3 border border-gray-600 rounded-lg bg-gray-800/50 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
          >
            Upload PDF
          </button>
        </form>
      </main>
    </div>
  );
};

export default HomePage;