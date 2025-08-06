import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { BarChart2, Camera, FileText } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    Tooltip,
    Legend
);

const ChartRenderer = ({ excelData, columns }) => {
    const [chartType, setChartType] = useState("Bar");
    const [xKey, setXKey] = useState(columns[0]);
    const [yKey, setYKey] = useState(columns[1]);

    const parseNumericData = (row) => {
        const val = parseFloat(row[yKey]);
        return isNaN(val) ? 0 : val;
    };

    const chartData = {
        labels: excelData.map((row) => row[xKey]),
        datasets: [
            {
                label: yKey,
                data: excelData.map(parseNumericData),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const renderChart = () => {
        switch (chartType) {
            case "Bar":
                return <Bar data={chartData} />;
            case "Line":
                return <Line data={chartData} />;
            case "Pie":
                return (
                    <Pie
                        data={{
                            labels: excelData.map((row) => row[xKey]),
                            datasets: [
                                {
                                    label: xKey,
                                    data: excelData.map(parseNumericData),
                                    backgroundColor: [
                                        "#FF6384",
                                        "#36A2EB",
                                        "#FFCE56",
                                        "#4BC0C0",
                                        "#9966FF",
                                    ],
                                },
                            ],
                        }}
                    />
                );
            default:
                return null;
        }
    };

    const downloadPNG = () => {
    const chartEl = document.getElementById("chart");

    chartEl.style.backgroundColor = "#ffffff";

    html2canvas(chartEl, {
        backgroundColor: "#ffffff",
    }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = canvas.toDataURL();
        link.click();
    });
};

    const downloadPDF = () => {
    const chartEl = document.getElementById("chart");

    chartEl.style.backgroundColor = "#ffffff";

    html2canvas(chartEl, {
        backgroundColor: "#ffffff",
    }).then((canvas) => {
        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height],
        });
        pdf.addImage(img, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("chart.pdf");
    });
};

    return (
        <div className="p-0 rounded-2xl shadow-2xl bg-white dark:bg-gray-900 mt-10 w-full max-w-4xl mx-auto overflow-hidden">
            <div className="flex items-center justify-center py-6 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
                <BarChart2 className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white tracking-wide">Chart Preview</h2>
            </div>

            <div className="flex flex-wrap gap-6 justify-center mb-6 mt-6 px-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl mx-4 shadow-inner">
                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Chart Type</label>
                    <select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white transition"
                    >
                        <option value="Bar">Bar</option>
                        <option value="Line">Line</option>
                        <option value="Pie">Pie</option>
                    </select>
                </div>

                <div className="flex flex-col min-w-[120px]">
                    <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">X Axis</label>
                    <select
                        value={xKey}
                        onChange={(e) => setXKey(e.target.value)}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white transition"
                    >
                        {columns.map((col) => (
                            <option key={col} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>

                {chartType !== "Pie" && (
                    <div className="flex flex-col min-w-[120px]">
                        <label className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">Y Axis</label>
                        <select
                            value={yKey}
                            onChange={(e) => setYKey(e.target.value)}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white transition"
                        >
                            {columns.map((col) => (
                                <option key={col} value={col}>
                                    {col}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div
                id="chart"
                className="bg-white p-6 border rounded-2xl shadow mb-6 max-w-3xl mx-auto dark:bg-gray-800 transition"
                style={{ backgroundColor: "#ffffff" }}
            >
                {renderChart()}
            </div>

            <div className="flex justify-center gap-6 pb-6">
                <button
                    onClick={downloadPNG}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition shadow-lg"
                >
                    <Camera className="w-5 h-5" /> Download PNG
                </button>
                <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 active:scale-95 transition shadow-lg"
                >
                    <FileText className="w-5 h-5" /> Download PDF
                </button>
            </div>
        </div>
    );
};

export default ChartRenderer;