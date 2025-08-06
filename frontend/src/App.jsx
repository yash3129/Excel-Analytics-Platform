import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginSignup from "./components/LoginSignup";
import FileUploader from "./components/FileUploader";
import ChartRenderer from "./components/ChartRenderer";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const MainHome = ({ token, setToken, excelData, setExcelData, columns, setColumns }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center py-8 px-2 transition-all duration-500">
    <h1 className="flex items-center gap-3 text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-10 mt-2 drop-shadow-lg bg-white/60 dark:bg-gray-900/60 px-6 py-4 rounded-2xl shadow-xl border border-white/40 dark:border-gray-800/40 backdrop-blur-md">
      <span role="img" aria-label="chart">📊</span>
      <span>Excel Analytics Platform</span>
    </h1>
    {!token ? (
      <LoginSignup setToken={setToken} />
    ) : (
      <>
        <FileUploader token={token} setExcelData={setExcelData} setColumns={setColumns} />
        {excelData.length > 0 && (
          <ChartRenderer excelData={excelData} columns={columns} />
        )}
      </>
    )}
  </div>
);

const App = () => {
  const [token, setToken] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainHome
              token={token}
              setToken={setToken}
              excelData={excelData}
              setExcelData={setExcelData}
              columns={columns}
              setColumns={setColumns}
            />
          }
        />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-register" element={<AdminRegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
