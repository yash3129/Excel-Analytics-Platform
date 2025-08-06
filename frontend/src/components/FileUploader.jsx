import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Upload } from "lucide-react";

const FileUploader = ({ setExcelData, setColumns }) => {
    const [dragActive, setDragActive] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRef = useRef();

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            const wb = XLSX.read(evt.target.result, { type: "binary" });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(ws);
            setExcelData(data);
            setColumns(Object.keys(data[0]));
            setSuccess(true);
        };
        reader.readAsBinaryString(file);
    };

    const handleChange = (e) => {
        setSuccess(false);
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        setSuccess(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-auto mt-12">
            <div className="flex items-center mb-4 justify-center">
                <Upload className="w-7 h-7 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Upload Excel File</h3>
            </div>
            <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors duration-200 cursor-pointer ${dragActive ? 'border-blue-400 bg-blue-50 dark:bg-gray-800' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}
                onDragOver={e => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
            >
                <Upload className="w-10 h-10 text-blue-400 mb-2" />
                <p className="text-gray-600 dark:text-gray-300 mb-2">Drag & drop your .xlsx or .xls file here, or</p>
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Browse Files
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleChange}
                    className="hidden"
                />
            </div>
            {success && (
                <div className="mt-4 text-green-600 text-center font-medium">File uploaded successfully!</div>
            )}
        </div>
    );
};

export default FileUploader;