// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Modal } from "react-bootstrap"; // Using Modal from react-bootstrap for now
// import * as xlsx from "xlsx";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { jsPDF } from "jspdf";
// import 'jspdf-autotable';

// const API_BASE = import.meta.env.VITE_API_BASE;

// const DetailView = () => {
//     const { registrationNumber } = useParams();
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [showImagePreview, setShowImagePreview] = useState(false);
//     const [selectedImageUrl, setSelectedImageUrl] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch(`${API_BASE}/getdata/${registrationNumber}`);
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const result = await res.json();
//                 setUserData(result);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 toast.error("Failed to fetch user data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (registrationNumber) fetchData();
//     }, [registrationNumber]);

//     const getImageUrl = (prediction) => {
//         if (prediction.overlayFileId) return `${API_BASE}/file/${prediction.overlayFileId}`;
//         if (prediction.originalFileId) return `${API_BASE}/file/${prediction.originalFileId}`;
//         return "";
//     };

//     const handleImageClick = (prediction) => {
//         const url = getImageUrl(prediction);
//         setSelectedImageUrl(url);
//         setShowImagePreview(true);
//     };

//     const handleCloseImagePreview = () => {
//         setShowImagePreview(false);
//         setSelectedImageUrl(null);
//     };

//     const handleDownloadPDF = () => {
//         if (!userData || !userData[0]) return toast.error("No data available");
//         // ... (PDF logic remains the same)
//         const pdf = new jsPDF();
//         const user = userData[0];
//         pdf.text(`Details for Registration No: ${user.registration_number}`, 14, 15);
//         pdf.text(`Phone Number: ${user.Phone_number || 'N/A'}`, 14, 22);
//         const rows = user.predictions.filter((p) => p.label.toLowerCase() === "cracked").map((p) => [
//             new Date(p.date).toLocaleString(), p.imageName || p.originalFileId || "—", p.label, p.predictionQuality || 'N/A'
//         ]);
//         if (rows.length > 0) {
//             pdf.autoTable({ startY: 30, head: [["Date", "Image Name / FileId", "Label", "Feedback Quality"]], body: rows });
//             pdf.save(`user_details_${registrationNumber}.pdf`);
//             toast.success("PDF downloaded successfully!");
//         } else {
//             toast.info("No 'cracked' predictions to download.");
//         }
//     };

//     const handleDownloadExcel = () => {
//         if (!userData || !userData[0]) return toast.error("No data available");
//         // ... (Excel logic remains the same)
//         const rows = userData[0].predictions.map((p) => ({
//             date: new Date(p.date).toLocaleString(), imageName: p.imageName || "", label: p.label,
//             predictionValue: p.prediction, originalFileId: p.originalFileId || "",
//             overlayFileId: p.overlayFileId || "", feedback: p.feedback || "",
//             predictionQuality: p.predictionQuality || ""
//         }));
//         const ws = xlsx.utils.json_to_sheet(rows);
//         const wb = xlsx.utils.book_new();
//         xlsx.utils.book_append_sheet(wb, ws, "Predictions");
//         xlsx.writeFile(wb, `user_details_${registrationNumber}.xlsx`);
//         toast.success("Excel downloaded successfully!");
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center min-h-screen bg-gray-50">
//                 <div className="w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     const hasCrackedPredictions = userData && userData[0] && userData[0].predictions.some(p => p.label.toLowerCase() === 'cracked');

//     return (
//         <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
//             <div className="container mx-auto">
//                 <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Dealer Dashboard</h1>
//                 <p className="text-lg text-gray-500 mb-8">Detailed view of vehicle reports</p>
                
//                 {/* User Details Card */}
//                 {userData && userData[0] && (
//                     <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <h3 className="text-sm font-medium text-gray-500">Registration Number</h3>
//                                 <p className="text-lg font-semibold text-gray-900">{userData[0].registration_number}</p>
//                             </div>
//                             <div>
//                                 <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
//                                 <p className="text-lg font-semibold text-gray-900">{userData[0].Phone_number || "N/A"}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <h2 className="text-2xl font-bold text-gray-700 mb-4">Cracked Tyre Predictions</h2>
                
//                 {/* Predictions Table */}
//                 {hasCrackedPredictions ? (
//                     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date & Time</th>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Image</th>
//                                     <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Label</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {userData[0].predictions.map((prediction, index) =>
//                                     prediction.label.toLowerCase() === "cracked" && (
//                                         <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(prediction.date).toLocaleString()}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span onClick={() => handleImageClick(prediction)} className="text-sm font-medium text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer">
//                                                     View Image
//                                                 </span>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                                     {prediction.label}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     )
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 ) : (
//                     <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md" role="alert">
//                         <p>No cracked predictions available for this user.</p>
//                     </div>
//                 )}
                
//                 {/* Action Buttons */}
//                 <div className="mt-8 flex flex-wrap gap-4">
//                     <button onClick={handleDownloadExcel} className="px-5 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200">
//                         Download All (Excel)
//                     </button>
//                     <button onClick={handleDownloadPDF} disabled={!hasCrackedPredictions} className="px-5 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
//                         Download Cracked (PDF)
//                     </button>
//                 </div>
//             </div>

//             {/* Bootstrap Modal for Image Preview */}
//             <Modal show={showImagePreview} onHide={handleCloseImagePreview} centered size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title className="text-xl font-bold">Image Preview</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div className="p-4 bg-gray-100 rounded-lg">
//                         {selectedImageUrl ? (
//                             <img src={selectedImageUrl} alt="Preview" className="max-w-full h-auto mx-auto rounded-md shadow-sm" />
//                         ) : (
//                             <p className="text-center text-gray-500">No image available</p>
//                         )}
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                      <button onClick={handleCloseImagePreview} className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200">
//                         Close
//                     </button>
//                 </Modal.Footer>
//             </Modal>
            
//             <ToastContainer position="bottom-right" />
//         </div>
//     );
// };
// export default DetailView;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as xlsx from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const API_BASE = import.meta.env.VITE_API_BASE;

const DetailView = () => {
  const { registrationNumber } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState(null); // single selected prediction

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/getdata/${registrationNumber}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();
        setUserData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    if (registrationNumber) fetchData();
  }, [registrationNumber]);

  const getImageUrl = (prediction) => {
    if (prediction.overlayFileId) return `${API_BASE}/file/${prediction.overlayFileId}`;
    if (prediction.originalFileId) return `${API_BASE}/file/${prediction.originalFileId}`;
    return "";
  };

  const handleSelectPrediction = (prediction) => {
    if (selectedPrediction && selectedPrediction === prediction) {
      setSelectedPrediction(null); // toggle off
    } else {
      setSelectedPrediction(prediction); // show only one
    }
  };

  const handleDownloadPDF = () => {
    if (!userData || !userData[0]) return toast.error("No data available");
    const pdf = new jsPDF();
    const user = userData[0];
    pdf.text(`Details for Registration No: ${user.registration_number}`, 14, 15);
    pdf.text(`Phone Number: ${user.Phone_number || "N/A"}`, 14, 22);

    const rows = user.predictions
      .filter((p) => p.label.toLowerCase() === "cracked")
      .map((p) => [
        new Date(p.date).toLocaleString(),
        p.imageName || p.originalFileId || "—",
        p.label,
        p.predictionQuality || "N/A",
      ]);

    if (rows.length > 0) {
      pdf.autoTable({
        startY: 30,
        head: [["Date", "Image Name / FileId", "Label", "Feedback Quality"]],
        body: rows,
      });
      pdf.save(`user_details_${registrationNumber}.pdf`);
      toast.success("PDF downloaded successfully!");
    } else {
      toast.info("No 'cracked' predictions to download.");
    }
  };

  const handleDownloadExcel = () => {
    if (!userData || !userData[0]) return toast.error("No data available");
    const rows = userData[0].predictions.map((p) => ({
      date: new Date(p.date).toLocaleString(),
      imageName: p.imageName || "",
      label: p.label,
      predictionValue: p.prediction,
      originalFileId: p.originalFileId || "",
      overlayFileId: p.overlayFileId || "",
      feedback: p.feedback || "",
      predictionQuality: p.predictionQuality || "",
    }));

    const ws = xlsx.utils.json_to_sheet(rows);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Predictions");
    xlsx.writeFile(wb, `user_details_${registrationNumber}.xlsx`);
    toast.success("Excel downloaded successfully!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasCrackedPredictions =
    userData &&
    userData[0] &&
    userData[0].predictions.some((p) => p.label.toLowerCase() === "cracked");

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Dealer Dashboard
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Detailed view of vehicle reports
        </p>

        {/* User Details Card */}
        {userData && userData[0] && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Registration Number
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {userData[0].registration_number}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {userData[0].Phone_number || "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Cracked Tyre Predictions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table */}
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
            {hasCrackedPredictions ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Label
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userData[0].predictions.map(
                    (prediction, index) =>
                      prediction.label.toLowerCase() === "cracked" && (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {new Date(prediction.date).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              onClick={() => handleSelectPrediction(prediction)}
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer"
                            >
                              {selectedPrediction === prediction
                                ? "Hide Image"
                                : "View Image"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              {prediction.label}
                            </span>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            ) : (
              <div
                className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md"
                role="alert"
              >
                <p>No cracked predictions available for this user.</p>
              </div>
            )}
          </div>

          {/* Image Preview Card */}
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-center">
            {selectedPrediction ? (
              <img
                src={getImageUrl(selectedPrediction)}
                alt="Preview"
                className="max-w-full max-h-[400px] rounded-md shadow-sm border"
              />
            ) : (
              <p className="text-gray-500">Select a row to preview image</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handleDownloadExcel}
            className="px-5 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Download All (Excel)
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={!hasCrackedPredictions}
            className="px-5 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Download Cracked (PDF)
          </button>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default DetailView;
