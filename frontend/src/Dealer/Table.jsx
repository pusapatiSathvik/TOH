// src/Dealer/Table.jsx
import React, { useState, useEffect } from "react";
import "./Table.css";
import { Button, Modal } from "react-bootstrap";
import * as xlsx from "xlsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { useNavigate } from "react-router-dom";

// **VITE SYNTAX**
const API_BASE = import.meta.env.VITE_API_BASE;

const Table = () => {
    // ... (rest of the component logic is unchanged)
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE}/getdata`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Could not fetch data from the server.");
            }
        };
        fetchData();
    }, []);
    const handleViewClick = (registrationNumber) => {
        navigate(`/detail/${registrationNumber}`);
    };
    const filteredData = data ? data.filter(item =>
        item.predictions.some(prediction =>
            prediction.label.toLowerCase() === "cracked" &&
            (
                (item.registration_number && item.registration_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.Phone_number && item.Phone_number.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        )
    ) : [];
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleDownloadPDF = () => {
        setShowDownloadModal(false);
        const pdf = new jsPDF();
        pdf.deletePage(1);
        filteredData.forEach((user) => {
            pdf.addPage();
            pdf.text(`Registration Number: ${user.registration_number}`, 10, 10);
            pdf.text("Cracked Predictions:", 10, 20);
            const tableData = user.predictions.filter(p => p.label.toLowerCase() === "cracked").map((prediction, index) => [
                index + 1, new Date(prediction.date).toLocaleString(), prediction.label
            ]);
            if (tableData.length > 0) {
                pdf.autoTable({ startY: 25, head: [['#', 'Date', 'Label']], body: tableData });
            } else {
                pdf.text("No 'cracked' predictions available.", 10, 30);
            }
        });
        pdf.save(`user_details_cracked.pdf`);
        toast.success('PDF downloaded successfully!');
    };
    const handleDownloadExcel = () => {
        setShowDownloadModal(false);
        const wb = xlsx.utils.book_new();
        const dataToExport = filteredData.flatMap(user =>
            user.predictions.filter(p => p.label.toLowerCase() === 'cracked').map(p => ({
                'Registration Number': user.registration_number,
                'Phone Number': user.Phone_number,
                'Date': new Date(p.date).toLocaleString(),
                'Image Name': p.imageName,
                'Label': p.label,
                'Feedback': p.feedback,
                'Prediction Quality': p.predictionQuality,
            }))
        );
        if (dataToExport.length > 0) {
            const ws = xlsx.utils.json_to_sheet(dataToExport);
            xlsx.utils.book_append_sheet(wb, ws, "Cracked Predictions");
            xlsx.writeFile(wb, `cracked_tyre_reports.xlsx`);
            toast.success('Excel downloaded successfully!');
        } else {
            toast.info('No cracked predictions to export.');
        }
    };
    return (
        <div className={`table-container`}>
            <br /><br /><br /><br />
            <h1>Tyre Reports (Cracked)</h1>
            <div>
                <input type="text" placeholder="Search by Reg No or Phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <div className="download-options">
                    <Button variant="primary" onClick={() => setShowDownloadModal(true)} disabled={filteredData.length === 0}>Download All</Button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Registration Number</th>
                            <th scope="col">Last Updated Time</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{indexOfFirstItem + index + 1}</th>
                                <td>{item.registration_number}</td>
                                <td>{new Date(item.predictions[item.predictions.length - 1].date).toLocaleString()}</td>
                                <td><button onClick={() => handleViewClick(item.registration_number)}>View</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length > 0 && (
                    <div>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                                <li key={index} className={currentPage === index + 1 ? 'active' : ''} onClick={() => paginate(index + 1)}><a href="#!">{index + 1}</a></li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Modal show={showDownloadModal} onHide={() => setShowDownloadModal(false)} centered>
                <Modal.Header closeButton><Modal.Title>Download User Details</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Button variant="success" onClick={handleDownloadExcel} className="me-2">Download as Excel</Button>
                    <Button variant="danger" onClick={handleDownloadPDF}>Download as PDF</Button>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </div>
    );
};
export default Table;