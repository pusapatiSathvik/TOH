
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Modal } from "react-bootstrap";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import { motion, AnimatePresence } from "framer-motion";

// // // const API_BASE = import.meta.env.VITE_API_BASE;

// // // // ====================================================================
// // // // Reusable UI Components
// // // // ====================================================================

// // // const EmptyState = ({ type, regNumber }) => {
// // //     const states = {
// // //         initial: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Search Vehicle Records", description: "Enter a registration number to view detailed vehicle inspection history and reports." },
// // //         noResults: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "No Records Found", description: `We couldn't locate any inspection records for vehicle "${regNumber}". Please verify the number and try again.` }
// // //     };
// // //     const state = states[type];
// // //     return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 px-8 text-center">{state.icon}<h3 className="text-2xl font-semibold text-gray-700 mb-3">{state.title}</h3><p className="text-gray-500 max-w-lg leading-relaxed">{state.description}</p></motion.div>;
// // // };

// // // const LoadingSpinner = () => (
// // //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
// // //         <div className="relative mb-6">
// // //             <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
// // //             <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// // //         </div>
// // //         <div className="text-center"><h3 className="text-lg font-semibold text-gray-700 mb-2">Searching Records</h3><p className="text-gray-500">Please wait while we fetch inspection data...</p></div>
// // //     </motion.div>
// // // );

// // // const StatusBadge = ({ status }) => {
// // //     const statusConfig = { 'good': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'ok': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'cracked': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'damaged': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'normal': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'default': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-400' } };
// // //     const config = statusConfig[status.toLowerCase()] || statusConfig.default;
// // //     return <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}><div className={`w-2.5 h-2.5 rounded-full mr-3 ${config.dot}`}></div>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
// // // };

// // // const RecordCard = ({ prediction, index, onImageClick }) => (
// // //     <motion.div
// // //         variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
// // //         whileHover={{ scale: 1.03, y: -5 }}
// // //         className="bg-white rounded-xl border border-gray-200 transition-shadow duration-300 hover:shadow-xl cursor-pointer"
// // //         onClick={() => onImageClick(prediction, index)}
// // //     >
// // //         <div className="p-6">
// // //             <div className="flex items-center justify-between mb-4">
// // //                 <div className="flex items-center gap-3">
// // //                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ring-4 ring-blue-50"><span className="text-blue-600 font-semibold text-sm">#{index + 1}</span></div>
// // //                     <div><h4 className="font-semibold text-gray-800">Inspection Record</h4><p className="text-sm text-gray-500">Click to view details</p></div>
// // //                 </div>
// // //                 <StatusBadge status={prediction.label} />
// // //             </div>
// // //             <div className="flex gap-3">
// // //                 <div className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg transition-all duration-200 gap-2">
// // //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
// // //                     View Details
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     </motion.div>
// // // );

// // // // ====================================================================
// // // // Main Component
// // // // ====================================================================
// // // function Udata() {
// // //     const [data, setData] = useState([]);
// // //     const [registrationNumber, setRegistrationNumber] = useState("");
// // //     const [searchedRegNumber, setSearchedRegNumber] = useState("");
// // //     const [loading, setLoading] = useState(false);
// // //     const [hasSearched, setHasSearched] = useState(false);
// // //     const [showModal, setShowModal] = useState(false);
// // //     const [currentPredictionIndex, setCurrentPredictionIndex] = useState(0);
// // //     const [selectedPrediction, setSelectedPrediction] = useState(null);
// // //     const [feedback, setFeedback] = useState("");
// // //     const [predictionSwitch, setPredictionSwitch] = useState(true);
// // //     const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);

// // //     const handleSearch = async (e) => {
// // //         e.preventDefault();
// // //         if (!registrationNumber.trim()) return toast.error("Please enter a registration number");
// // //         setLoading(true); setHasSearched(true); setSearchedRegNumber(registrationNumber.trim()); setData([]);
// // //         try {
// // //             const response = await axios.get(`${API_BASE}/search?registrationNumber=${encodeURIComponent(registrationNumber.trim())}`);
// // //             const predictions = response.data?.[0]?.predictions || [];
// // //             if (response.data?.length > 0) {
// // //                 setData(response.data);
// // //                 if (predictions.length > 0) toast.success(`Found ${predictions.length} inspection records`);
// // //                 else toast.info("Vehicle found, but no inspection records yet.");
// // //             } else {
// // //                 setData([]);
// // //                 toast.info("No vehicle records found.");
// // //             }
// // //         } catch (error) { toast.error("Failed to fetch records"); } finally { setLoading(false); }
// // //     };

// // //     const getImageUrl = (p) => p ? (p.overlayFileId ? `${API_BASE}/file/${p.overlayFileId}` : (p.originalFileId ? `${API_BASE}/file/${p.originalFileId}` : "")) : "";

// // //     const handleImageClick = (prediction, index) => { setCurrentPredictionIndex(index); setSelectedPrediction(prediction); setShowFeedbackPanel(false); setShowModal(true); };
// // //     const handleCloseModal = () => { setShowModal(false); setSelectedPrediction(null); setFeedback(""); setShowFeedbackPanel(false); };

// // //     const navigateImages = (direction) => {
// // //         const predictions = data[0]?.predictions || [];
// // //         if (predictions.length <= 1) return;
// // //         let nextIndex = (currentPredictionIndex + direction + predictions.length) % predictions.length;
// // //         setCurrentPredictionIndex(nextIndex);
// // //         setSelectedPrediction(predictions[nextIndex]);
// // //         setShowFeedbackPanel(false);
// // //     };

// // //     const handleSubmitFeedback = async () => {
// // //         if (!data?.[0]) return toast.error("No record for feedback");
// // //         try {
// // //             await axios.post(`${API_BASE}/submitFeedback`, { registrationNumber: data[0].registration_number, feedback: feedback.trim(), predictionQuality: predictionSwitch ? "Accurate" : "Not Accurate" });
// // //             toast.success("Thank you! Feedback submitted successfully");
// // //             setFeedback(""); setShowFeedbackPanel(false);
// // //             const event = { preventDefault: () => {} };
// // //             await handleSearch(event);
// // //         } catch (error) { toast.error("Failed to submit feedback"); }
// // //     };

// // //     const ImageViewer = () => (
// // //         <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
// // //             {selectedPrediction && getImageUrl(selectedPrediction) ? (
// // //                 <img src={getImageUrl(selectedPrediction)} alt="Vehicle Inspection" className="w-full h-full object-contain" onError={(e) => { e.target.src = 'data:image/svg+xml,...'; }} />
// // //             ) : (
// // //                 <div className="flex flex-col items-center justify-center h-full text-gray-400"><svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span className="text-lg">Image Not Available</span><span className="text-sm mt-1">Please check the source file</span></div>
// // //             )}

// // //             {/* --- FIX IS HERE --- */}
// // //             {/* All elements with the same condition are now wrapped in a single fragment */}
// // //             {data[0]?.predictions?.length > 1 && (
// // //                 <>
// // //                     {/* Navigation Controls */}
// // //                     <button onClick={() => navigateImages(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm" aria-label="Previous image"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
// // //                     <button onClick={() => navigateImages(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm" aria-label="Next image"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></button>
// // //                     {/* Image Counter */}
// // //                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">{currentPredictionIndex + 1} of {data[0].predictions.length}</div>
// // //                 </>
// // //             )}

// // //             {selectedPrediction && (<div className="absolute top-4 left-4"><StatusBadge status={selectedPrediction.label} /></div>)}
// // //         </div>
// // //     );

// // //     return (
// // //         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
// // //             <div className="max-w-7xl mx-auto px-4 py-8">
// // //                 <header className="text-center mb-10">
// // //                     <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
// // //                     <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">Vehicle Inspection Portal</h1>
// // //                     <p className="text-xl text-gray-600 max-w-2xl mx-auto">Access comprehensive vehicle inspection records and detailed analysis reports.</p>
// // //                 </header>

// // //                 <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-10">
// // //                     <form onSubmit={handleSearch} className="max-w-3xl mx-auto"><div className="flex flex-col sm:flex-row gap-4"><div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Registration Number</label><input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())} placeholder="Enter registration number (e.g., KA01AB1234)" className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300" disabled={loading} /></div><div className="sm:pt-9"><button type="submit" disabled={loading || !registrationNumber.trim()} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105">{loading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Searching...</>) : (<><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Search Records</>)}</button></div></div></form>
// // //                 </section>

// // //                 <main className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 min-h-[500px]">
// // //                     <AnimatePresence mode="wait">
// // //                         {!hasSearched ? <EmptyState key="initial" type="initial" /> : loading ? <LoadingSpinner key="loading" /> : data.length > 0 && data[0].predictions?.length > 0 ? (
// // //                             <motion.div key="results" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
// // //                                 <header className="p-8 border-b border-gray-200/50"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-800 mb-2">Inspection Results</h2><div className="flex flex-wrap items-center gap-4 text-gray-600"><span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Vehicle: <span className="font-mono font-bold text-blue-600 text-lg">{data[0].registration_number}</span></span><span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>{data[0].predictions.length} Records Found</span></div></div><div className="text-right flex-shrink-0"><div className="text-sm text-gray-500">Last Updated</div><div className="text-lg font-semibold text-gray-700">{new Date(data[0].predictions[data[0].predictions.length - 1].date).toLocaleDateString()}</div></div></div></header>
// // //                                 <div className="p-8"><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{data[0].predictions.map((p, i) => <RecordCard key={p._id || i} prediction={p} index={i} onImageClick={handleImageClick} />)}</div></div>
// // //                             </motion.div>
// // //                         ) : <EmptyState key="no-results" type="noResults" regNumber={searchedRegNumber} />}
// // //                     </AnimatePresence>
// // //                 </main>
// // //             </div>

// // //             <Modal show={showModal} onHide={handleCloseModal} size="xl" centered dialogClassName="modal-90w lg:modal-80w" contentClassName="bg-transparent border-0">
// // //                 <div className="flex flex-col lg:flex-row h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
// // //                     <div className="flex-1 lg:w-2/3 p-4 bg-gray-900/90 backdrop-blur-sm"><ImageViewer /></div>
// // //                     <div className="w-full lg:w-96 bg-white border-l flex flex-col"><div className="p-6 border-b"><h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>Navigation</h4>{data[0]?.predictions?.length > 1 ? <div className="space-y-3"><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"><span className="text-sm font-medium text-gray-700">Record {currentPredictionIndex + 1} of {data[0].predictions.length}</span></div><div className="grid grid-cols-2 gap-2"><button onClick={() => navigateImages(-1)} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition text-sm font-medium">← Previous</button><button onClick={() => navigateImages(1)} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition text-sm font-medium">Next →</button></div></div> : <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border">Single record available.</p>}</div><div className="p-6 border-b"><h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Actions</h4><div className="space-y-3"><button onClick={() => setShowFeedbackPanel(!showFeedbackPanel)} className={`w-full px-4 py-3 rounded-lg transition font-medium ${showFeedbackPanel ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-blue-50 text-blue-600 border border-blue-200'}`}>{showFeedbackPanel ? 'Hide Feedback' : 'Provide Feedback'}</button></div></div><div className="flex-1 overflow-y-auto"><AnimatePresence>{showFeedbackPanel && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-6"><h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>Feedback Form</h4><div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Comments</label><textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Share your observations..." rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm" /></div><div><label className="block text-sm font-medium text-gray-700 mb-3">Prediction Accuracy</label><div className="bg-white p-4 rounded-lg border"><div className="flex items-center justify-between mb-2"><span className={`text-sm font-medium transition ${predictionSwitch ? 'text-gray-400' : 'text-red-600'}`}>Not Accurate</span><div onClick={() => setPredictionSwitch(!predictionSwitch)} className={`relative w-14 h-7 rounded-full cursor-pointer transition ${predictionSwitch ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${predictionSwitch ? 'translate-x-7' : ''}`}></div></div><span className={`text-sm font-medium transition ${predictionSwitch ? 'text-green-600' : 'text-gray-400'}`}>Accurate</span></div><p className="text-xs text-gray-500 text-center">Toggle to indicate if the prediction matches your assessment.</p></div></div><button onClick={handleSubmitFeedback} className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Submit Feedback</button></div></motion.div>}</AnimatePresence></div></div>
// // //                 </div>
// // //                 <Modal.Footer className="border-t-2 bg-gray-50 py-3"><div className="flex items-center justify-between w-full"><div className="text-sm text-gray-600">{selectedPrediction && (<span>Viewing: <strong>{selectedPrediction.label}</strong> • Record {currentPredictionIndex + 1} of {data[0]?.predictions?.length || 0}</span>)}</div><button onClick={handleCloseModal} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">Close</button></div></Modal.Footer>
// // //             </Modal>
            
// // //             <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" toastClassName="backdrop-blur-sm bg-white/90" />
// // //         </div>
// // //     );
// // // }

// // // export default Udata;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Modal } from "react-bootstrap";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { motion, AnimatePresence } from "framer-motion";

// // const API_BASE = import.meta.env.VITE_API_BASE;

// // // ====================================================================
// // // Reusable UI Components
// // // ====================================================================

// // const EmptyState = ({ type, regNumber }) => {
// //     const states = {
// //         initial: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Search Vehicle Records", description: "Enter a registration number to view detailed vehicle inspection history and reports." },
// //         noResults: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "No Records Found", description: `We couldn't locate any inspection records for vehicle "${regNumber}". Please verify the number and try again.` }
// //     };
// //     const state = states[type];
// //     return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 px-8 text-center">{state.icon}<h3 className="text-2xl font-semibold text-gray-700 mb-3">{state.title}</h3><p className="text-gray-500 max-w-lg leading-relaxed">{state.description}</p></motion.div>;
// // };

// // const LoadingSpinner = () => (
// //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
// //         <div className="relative mb-6">
// //             <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
// //             <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
// //         </div>
// //         <div className="text-center"><h3 className="text-lg font-semibold text-gray-700 mb-2">Searching Records</h3><p className="text-gray-500">Please wait while we fetch inspection data...</p></div>
// //     </motion.div>
// // );

// // const StatusBadge = ({ status }) => {
// //     const statusConfig = { 'good': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'ok': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'cracked': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'damaged': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'normal': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'default': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-400' } };
// //     const config = statusConfig[(status || '').toLowerCase()] || statusConfig.default;
// //     return <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}><div className={`w-2.5 h-2.5 rounded-full mr-3 ${config.dot}`}></div>{(status || '').charAt(0).toUpperCase() + (status || '').slice(1)}</span>;
// // };

// // const RecordCard = ({ prediction, index, onImageClick }) => (
// //     <motion.div
// //         variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
// //         whileHover={{ scale: 1.03, y: -5 }}
// //         className="bg-white rounded-xl border border-gray-200 transition-shadow duration-300 hover:shadow-xl cursor-pointer"
// //         onClick={() => onImageClick(prediction, index)}
// //     >
// //         <div className="p-6">
// //             <div className="flex items-center justify-between mb-4">
// //                 <div className="flex items-center gap-3">
// //                     <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ring-4 ring-blue-50"><span className="text-blue-600 font-semibold text-sm">#{index + 1}</span></div>
// //                     <div><h4 className="font-semibold text-gray-800">Inspection Record</h4><p className="text-sm text-gray-500">Click to view details</p></div>
// //                 </div>
// //                 <StatusBadge status={prediction.label} />
// //             </div>
// //             <div className="flex gap-3">
// //                 <div className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg transition-all duration-200 gap-2">
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
// //                     View Details
// //                 </div>
// //             </div>
// //         </div>
// //     </motion.div>
// // );

// // // ====================================================================
// // // Main Component
// // // ====================================================================
// // function Udata() {
// //     const [data, setData] = useState([]);
// //     const [registrationNumber, setRegistrationNumber] = useState("");
// //     const [searchedRegNumber, setSearchedRegNumber] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [hasSearched, setHasSearched] = useState(false);
// //     const [showModal, setShowModal] = useState(false);
// //     const [currentPredictionIndex, setCurrentPredictionIndex] = useState(0);
// //     const [selectedPrediction, setSelectedPrediction] = useState(null);
// //     const [feedback, setFeedback] = useState("");
// //     const [predictionSwitch, setPredictionSwitch] = useState(true);
// //     const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);

// //     // Image states
// //     const [imgLoading, setImgLoading] = useState(false);
// //     const [imgError, setImgError] = useState(false);

// //     const handleSearch = async (e) => {
// //         e.preventDefault();
// //         if (!registrationNumber.trim()) return toast.error("Please enter a registration number");
// //         setLoading(true); setHasSearched(true); setSearchedRegNumber(registrationNumber.trim()); setData([]);
// //         try {
// //             const response = await axios.get(`${API_BASE}/search?registrationNumber=${encodeURIComponent(registrationNumber.trim())}`);
// //             const predictions = response.data?.[0]?.predictions || [];
// //             if (response.data?.length > 0) {
// //                 setData(response.data);
// //                 if (predictions.length > 0) toast.success(`Found ${predictions.length} inspection records`);
// //                 else toast.info("Vehicle found, but no inspection records yet.");
// //             } else {
// //                 setData([]);
// //                 toast.info("No vehicle records found.");
// //             }
// //         } catch (error) { toast.error("Failed to fetch records"); } finally { setLoading(false); }
// //     };

// //     const getImageUrl = (p) => p ? (p.overlayFileId ? `${API_BASE}/file/${p.overlayFileId}` : (p.originalFileId ? `${API_BASE}/file/${p.originalFileId}` : "")) : "";

// //     const handleImageClick = (prediction, index) => { setCurrentPredictionIndex(index); setSelectedPrediction(prediction); setShowFeedbackPanel(false); setShowModal(true); };
// //     const handleCloseModal = () => { setShowModal(false); setSelectedPrediction(null); setFeedback(""); setShowFeedbackPanel(false); setImgLoading(false); setImgError(false); };

// //     const navigateImages = (direction) => {
// //         const predictions = data[0]?.predictions || [];
// //         if (predictions.length <= 1) return;
// //         let nextIndex = (currentPredictionIndex + direction + predictions.length) % predictions.length;
// //         setCurrentPredictionIndex(nextIndex);
// //         setSelectedPrediction(predictions[nextIndex]);
// //         setShowFeedbackPanel(false);
// //     };

// //     const handleSubmitFeedback = async () => {
// //         if (!data?.[0]) return toast.error("No record for feedback");
// //         try {
// //             await axios.post(`${API_BASE}/submitFeedback`, { registrationNumber: data[0].registration_number, feedback: feedback.trim(), predictionQuality: predictionSwitch ? "Accurate" : "Not Accurate" });
// //             toast.success("Thank you! Feedback submitted successfully");
// //             setFeedback(""); setShowFeedbackPanel(false);
// //             const event = { preventDefault: () => {} };
// //             await handleSearch(event);
// //         } catch (error) { toast.error("Failed to submit feedback"); }
// //     };

// //     // When the selectedPrediction changes, reset image loader states
// //     useEffect(() => {
// //         if (selectedPrediction && getImageUrl(selectedPrediction)) {
// //             setImgLoading(true);
// //             setImgError(false);
// //         } else {
// //             setImgLoading(false);
// //             setImgError(true);
// //         }
// //     }, [selectedPrediction]);

// //     // A small cubes loader (horizontal cubes animation)
// //     const CubesLoader = () => (
// //         <div className="flex items-center justify-center h-full">
// //             <div className="cubes-loader inline-flex gap-2" role="status" aria-label="Image is loading">
// //                 <div className="cube" />
// //                 <div className="cube" />
// //                 <div className="cube" />
// //                 <div className="cube" />
// //             </div>
// //         </div>
// //     );

// //     const CorruptedView = () => (
// //         <div className="flex flex-col items-center justify-center h-full text-gray-500">
// //             <svg className="w-16 h-16 mb-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //                 <path d="M7 10l5 5 5-5" />
// //                 <path d="M4 7a4 4 0 0 1 8 0" />
// //             </svg>
// //             <div className="text-lg font-medium">Image corrupted</div>
// //             <div className="text-sm mt-1 text-gray-400">Source file unavailable or corrupted.</div>
// //         </div>
// //     );

// //     const ImageViewer = () => (
// //         <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
// //             {/* global styles for loader animation injected here so they render with the component */}
// //             <style>{`
// //                 .cubes-loader .cube { width: 12px; height: 12px; background: rgba(255,255,255,0.9); border-radius: 2px; transform-origin: center bottom; animation: cubeWave 1s infinite ease-in-out; }
// //                 .cubes-loader .cube:nth-child(1){ animation-delay: 0s; }
// //                 .cubes-loader .cube:nth-child(2){ animation-delay: 0.12s; }
// //                 .cubes-loader .cube:nth-child(3){ animation-delay: 0.24s; }
// //                 .cubes-loader .cube:nth-child(4){ animation-delay: 0.36s; }
// //                 @keyframes cubeWave {
// //                     0% { transform: translateY(0) scaleY(1); opacity: 0.6; }
// //                     30% { transform: translateY(-10px) scaleY(1.1); opacity: 1; }
// //                     60% { transform: translateY(0) scaleY(1); opacity: 0.8; }
// //                     100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
// //                 }
// //                 /* make sure the loader respects dark bg */
// //                 .cubes-loader .cube { background: rgba(255,255,255,0.95); }
// //             `}</style>

// //             {selectedPrediction && getImageUrl(selectedPrediction) && (
// //                 <>
// //                     {/* Image element: hidden while loading to avoid showing a broken frame */}
// //                     <img
// //                         src={getImageUrl(selectedPrediction)}
// //                         alt={selectedPrediction?.label ? `Inspection - ${selectedPrediction.label}` : 'Vehicle Inspection'}
// //                         className="w-full h-full object-contain"
// //                         style={{ display: imgLoading ? 'none' : 'block' }}
// //                         onLoad={() => { setImgLoading(false); setImgError(false); }}
// //                         onError={() => { setImgLoading(false); setImgError(true); }}
// //                     />

// //                     {/* Loader shown while image is downloading */}
// //                     {imgLoading && (
// //                         <div className="absolute inset-0 flex items-center justify-center">
// //                             <CubesLoader />
// //                         </div>
// //                     )}

// //                     {/* Corrupted view if image fails */}
// //                     {!imgLoading && imgError && (
// //                         <div className="absolute inset-0 flex items-center justify-center">
// //                             <CorruptedView />
// //                         </div>
// //                     )}
// //                 </>
// //             )}

// //             {/* If no image url at all */}
// //             {(!selectedPrediction || !getImageUrl(selectedPrediction)) && (
// //                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
// //                     <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
// //                     <span className="text-lg">Image Not Available</span>
// //                     <span className="text-sm mt-1">Please check the source file</span>
// //                 </div>
// //             )}

// //             {/* Navigation Controls (show regardless of image loading state) */}
// //             {data[0]?.predictions?.length > 1 && (
// //                 <>
// //                     <button onClick={() => navigateImages(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm" aria-label="Previous image"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
// //                     <button onClick={() => navigateImages(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm" aria-label="Next image"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></button>
// //                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">{currentPredictionIndex + 1} of {data[0].predictions.length}</div>
// //                 </>
// //             )}

// //             {selectedPrediction && (<div className="absolute top-4 left-4"><StatusBadge status={selectedPrediction.label} /></div>)}
// //         </div>
// //     );

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
// //             <div className="max-w-7xl mx-auto px-4 py-8">
// //                 <header className="text-center mb-10">
// //                     <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
// //                     <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">Vehicle Inspection Portal</h1>
// //                     <p className="text-xl text-gray-600 max-w-2xl mx-auto">Access comprehensive vehicle inspection records and detailed analysis reports.</p>
// //                 </header>

// //                 <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-10">
// //                     <form onSubmit={handleSearch} className="max-w-3xl mx-auto"><div className="flex flex-col sm:flex-row gap-4"><div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Registration Number</label><input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())} placeholder="Enter registration number (e.g., KA01AB1234)" className="w-full px-5 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300" disabled={loading} /></div><div className="sm:pt-9"><button type="submit" disabled={loading || !registrationNumber.trim()} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105">{loading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Searching...</>) : (<><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Search Records</>)}</button></div></div></form>
// //                 </section>

// //                 <main className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 min-h-[500px]">
// //                     <AnimatePresence mode="wait">
// //                         {!hasSearched ? <EmptyState key="initial" type="initial" /> : loading ? <LoadingSpinner key="loading" /> : data.length > 0 && data[0].predictions?.length > 0 ? (
// //                             <motion.div key="results" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
// //                                 <header className="p-8 border-b border-gray-200/50"><div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-800 mb-2">Inspection Results</h2><div className="flex flex-wrap items-center gap-4 text-gray-600"><span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Vehicle: <span className="font-mono font-bold text-blue-600 text-lg">{data[0].registration_number}</span></span><span className="flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>{data[0].predictions.length} Records Found</span></div></div><div className="text-right flex-shrink-0"><div className="text-sm text-gray-500">Last Updated</div><div className="text-lg font-semibold text-gray-700">{new Date(data[0].predictions[data[0].predictions.length - 1].date).toLocaleDateString()}</div></div></div></header>
// //                                 <div className="p-8"><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{data[0].predictions.map((p, i) => <RecordCard key={p._id || i} prediction={p} index={i} onImageClick={handleImageClick} />)}</div></div>
// //                             </motion.div>
// //                         ) : <EmptyState key="no-results" type="noResults" regNumber={searchedRegNumber} />}
// //                     </AnimatePresence>
// //                 </main>
// //             </div>

// //             <Modal show={showModal} onHide={handleCloseModal} size="xl" centered dialogClassName="modal-90w lg:modal-80w" contentClassName="bg-transparent border-0">
// //                 <div className="flex flex-col lg:flex-row h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
// //                     <div className="flex-1 lg:w-2/3 p-4 bg-gray-900/90 backdrop-blur-sm"><ImageViewer /></div>
// //                     <div className="w-full lg:w-96 bg-white border-l flex flex-col"><div className="p-6 border-b"><h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>Navigation</h4>{data[0]?.predictions?.length > 1 ? <div className="space-y-3"><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"><span className="text-sm font-medium text-gray-700">Record {currentPredictionIndex + 1} of {data[0].predictions.length}</span></div><div className="grid grid-cols-2 gap-2"><button onClick={() => navigateImages(-1)} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition text-sm font-medium">← Previous</button><button onClick={() => navigateImages(1)} className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg transition text-sm font-medium">Next →</button></div></div> : <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border">Single record available.</p>}</div><div className="p-6 border-b"><h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Actions</h4><div className="space-y-3"><button onClick={() => setShowFeedbackPanel(!showFeedbackPanel)} className={`w-full px-4 py-3 rounded-lg transition font-medium ${showFeedbackPanel ? 'bg-blue-600 text-white shadow-md' : 'bg-white hover:bg-blue-50 text-blue-600 border border-blue-200'}`}>{showFeedbackPanel ? 'Hide Feedback' : 'Provide Feedback'}</button></div></div><div className="flex-1 overflow-y-auto"><AnimatePresence>{showFeedbackPanel && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-6"><h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>Feedback Form</h4><div className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Comments</label><textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Share your observations..." rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm" /></div><div><label className="block text-sm font-medium text-gray-700 mb-3">Prediction Accuracy</label><div className="bg-white p-4 rounded-lg border"><div className="flex items-center justify-between mb-2"><span className={`text-sm font-medium transition ${predictionSwitch ? 'text-gray-400' : 'text-red-600'}`}>Not Accurate</span><div onClick={() => setPredictionSwitch(!predictionSwitch)} className={`relative w-14 h-7 rounded-full cursor-pointer transition ${predictionSwitch ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${predictionSwitch ? 'translate-x-7' : ''}`}></div></div><span className={`text-sm font-medium transition ${predictionSwitch ? 'text-green-600' : 'text-gray-400'}`}>Accurate</span></div><p className="text-xs text-gray-500 text-center">Toggle to indicate if the prediction matches your assessment.</p></div></div><button onClick={handleSubmitFeedback} className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Submit Feedback</button></div></motion.div>}</AnimatePresence></div></div>
// //                 </div>
// //                 <Modal.Footer className="border-t-2 bg-gray-50 py-3"><div className="flex items-center justify-between w-full"><div className="text-sm text-gray-600">{selectedPrediction && (<span>Viewing: <strong>{selectedPrediction.label}</strong> • Record {currentPredictionIndex + 1} of {data[0]?.predictions?.length || 0}</span>)}</div><button onClick={handleCloseModal} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">Close</button></div></Modal.Footer>
// //             </Modal>

// //             <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" toastClassName="backdrop-blur-sm bg-white/90" />
// //         </div>
// //     );
// // }

// // export default Udata;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion, AnimatePresence } from "framer-motion";

// const API_BASE = import.meta.env.VITE_API_BASE;

// // ====================================================================
// // Reusable UI Components
// // ====================================================================

// const EmptyState = ({ type, regNumber }) => {
//     const states = {
//         initial: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Search Vehicle Records", description: "Enter a registration number to view detailed vehicle inspection history and reports." },
//         noResults: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "No Records Found", description: `We couldn't locate any inspection records for vehicle "${regNumber}". Please verify the number and try again.` }
//     };
//     const state = states[type];
//     return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 px-8 text-center">{state.icon}<h3 className="text-2xl font-semibold text-gray-700 mb-3">{state.title}</h3><p className="text-gray-500 max-w-lg leading-relaxed">{state.description}</p></motion.div>;
// };

// const LoadingSpinner = () => (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
//         <div className="relative mb-6">
//             <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
//             <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//         <div className="text-center"><h3 className="text-lg font-semibold text-gray-700 mb-2">Searching Records</h3><p className="text-gray-500">Please wait while we fetch inspection data...</p></div>
//     </motion.div>
// );

// const StatusBadge = ({ status }) => {
//     const statusConfig = { 'good': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'ok': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'cracked': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'damaged': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'normal': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'default': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-400' } };
//     const config = statusConfig[(status || '').toLowerCase()] || statusConfig.default;
//     return <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}><div className={`w-2.5 h-2.5 rounded-full mr-3 ${config.dot}`}></div>{(status || '').charAt(0).toUpperCase() + (status || '').slice(1)}</span>;
// };

// const RecordCard = ({ prediction, index, onImageClick, isActive }) => (
//     <motion.div
//         variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//         whileHover={{ scale: 1.01 }}
//         className={`bg-white rounded-lg border transition-shadow duration-200 cursor-pointer p-4 flex items-start gap-3 ${isActive ? 'ring-2 ring-blue-300 shadow' : 'hover:shadow-md'}`}
//         onClick={() => onImageClick(prediction, index)}
//     >
//         <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center text-blue-600 font-semibold">#{index + 1}</div>
//         <div className="flex-1">
//             <div className="flex items-center justify-between mb-1">
//                 <h4 className="font-medium text-gray-800">{prediction.label || 'Unknown'}</h4>
//                 <StatusBadge status={prediction.label} />
//             </div>
//             <p className="text-xs text-gray-500">{prediction.description || ''}</p>
//             <div className="text-xs text-gray-400 mt-2">{prediction.date ? new Date(prediction.date).toLocaleString() : ''}</div>
//         </div>
//     </motion.div>
// );

// // ====================================================================
// // Main Component (Two column layout)
// // ====================================================================
// function Udata() {
//     const [data, setData] = useState([]);
//     const [registrationNumber, setRegistrationNumber] = useState("");
//     const [searchedRegNumber, setSearchedRegNumber] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [hasSearched, setHasSearched] = useState(false);
//     const [currentPredictionIndex, setCurrentPredictionIndex] = useState(0);
//     const [selectedPrediction, setSelectedPrediction] = useState(null);
//     const [feedback, setFeedback] = useState("");
//     const [predictionSwitch, setPredictionSwitch] = useState(true);
//     const [showFeedbackPanel, setShowFeedbackPanel] = useState(true); // show by default on right pane

//     // Image states
//     const [imgLoading, setImgLoading] = useState(false);
//     const [imgError, setImgError] = useState(false);

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         if (!registrationNumber.trim()) return toast.error("Please enter a registration number");
//         setLoading(true); setHasSearched(true); setSearchedRegNumber(registrationNumber.trim()); setData([]);
//         try {
//             const response = await axios.get(`${API_BASE}/search?registrationNumber=${encodeURIComponent(registrationNumber.trim())}`);
//             if (response.data?.length > 0) {
//                 setData(response.data);
//                 const preds = response.data[0].predictions || [];
//                 if (preds.length > 0) {
//                     setSelectedPrediction(preds[0]);
//                     setCurrentPredictionIndex(0);
//                     toast.success(`Found ${preds.length} inspection records`);
//                 } else {
//                     setSelectedPrediction(null);
//                     toast.info("Vehicle found, but no inspection records yet.");
//                 }
//             } else {
//                 setData([]);
//                 setSelectedPrediction(null);
//                 toast.info("No vehicle records found.");
//             }
//         } catch (error) { toast.error("Failed to fetch records"); } finally { setLoading(false); }
//     };

//     const getImageUrl = (p) => p ? (p.overlayFileId ? `${API_BASE}/file/${p.overlayFileId}` : (p.originalFileId ? `${API_BASE}/file/${p.originalFileId}` : "")) : "";

//     const handleRecordClick = (prediction, index) => { setCurrentPredictionIndex(index); setSelectedPrediction(prediction); setShowFeedbackPanel(true); };

//     const navigateImages = (direction) => {
//         const predictions = data[0]?.predictions || [];
//         if (predictions.length <= 1) return;
//         let nextIndex = (currentPredictionIndex + direction + predictions.length) % predictions.length;
//         setCurrentPredictionIndex(nextIndex);
//         setSelectedPrediction(predictions[nextIndex]);
//     };

//     const handleSubmitFeedback = async () => {
//         if (!data?.[0]) return toast.error("No record for feedback");
//         try {
//             await axios.post(`${API_BASE}/submitFeedback`, { registrationNumber: data[0].registration_number, feedback: feedback.trim(), predictionQuality: predictionSwitch ? "Accurate" : "Not Accurate" });
//             toast.success("Thank you! Feedback submitted successfully");
//             setFeedback("");
//             // optimistic refresh: re-fetch records
//             const event = { preventDefault: () => {} };
//             await handleSearch(event);
//         } catch (error) { toast.error("Failed to submit feedback"); }
//     };

//     // When selectedPrediction changes, reset image loader states
//     useEffect(() => {
//         if (selectedPrediction && getImageUrl(selectedPrediction)) {
//             setImgLoading(true);
//             setImgError(false);
//         } else {
//             setImgLoading(false);
//             setImgError(true);
//         }
//     }, [selectedPrediction]);

//     // Cubes loader
//     const CubesLoader = () => (
//         <div className="flex items-center justify-center h-full">
//             <div className="cubes-loader inline-flex gap-2" role="status" aria-label="Image is loading">
//                 <div className="cube" />
//                 <div className="cube" />
//                 <div className="cube" />
//                 <div className="cube" />
//             </div>
//             <style>{`
//                 .cubes-loader .cube { width: 12px; height: 12px; background: rgba(255,255,255,0.9); border-radius: 2px; transform-origin: center bottom; animation: cubeWave 1s infinite ease-in-out; }
//                 .cubes-loader .cube:nth-child(1){ animation-delay: 0s; }
//                 .cubes-loader .cube:nth-child(2){ animation-delay: 0.12s; }
//                 .cubes-loader .cube:nth-child(3){ animation-delay: 0.24s; }
//                 .cubes-loader .cube:nth-child(4){ animation-delay: 0.36s; }
//                 @keyframes cubeWave {
//                     0% { transform: translateY(0) scaleY(1); opacity: 0.6; }
//                     30% { transform: translateY(-10px) scaleY(1.1); opacity: 1; }
//                     60% { transform: translateY(0) scaleY(1); opacity: 0.8; }
//                     100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
//                 }
//             `}</style>
//         </div>
//     );

//     const CorruptedView = () => (
//         <div className="flex flex-col items-center justify-center h-full text-gray-400">
//             <svg className="w-16 h-16 mb-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                 <path d="M7 10l5 5 5-5" />
//                 <path d="M4 7a4 4 0 0 1 8 0" />
//             </svg>
//             <div className="text-lg font-medium">Image corrupted</div>
//             <div className="text-sm mt-1 text-gray-400">Source file unavailable or corrupted.</div>
//         </div>
//     );

//     const ImagePanel = () => (
//         <div className="w-full h-96 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative">
//             {selectedPrediction && getImageUrl(selectedPrediction) ? (
//                 <>
//                     <img
//                         src={getImageUrl(selectedPrediction)}
//                         alt={selectedPrediction?.label ? `Inspection - ${selectedPrediction.label}` : 'Vehicle Inspection'}
//                         className="max-w-full max-h-full object-contain"
//                         style={{ display: imgLoading ? 'none' : 'block' }}
//                         onLoad={() => { setImgLoading(false); setImgError(false); }}
//                         onError={() => { setImgLoading(false); setImgError(true); }}
//                     />

//                     {imgLoading && (<div className="absolute inset-0 flex items-center justify-center"><CubesLoader /></div>)}
//                     {!imgLoading && imgError && (<div className="absolute inset-0 flex items-center justify-center"><CorruptedView /></div>)}
//                 </>
//             ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
//                     <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
//                     <span className="text-lg">Image Not Available</span>
//                     <span className="text-sm mt-1">Please check the source file</span>
//                 </div>
//             )}

//             {/* status badge */}
//             {selectedPrediction && (<div className="absolute top-3 left-3"><StatusBadge status={selectedPrediction.label} /></div>)}

//             {/* nav controls */}
//             {data[0]?.predictions?.length > 1 && (
//                 <>
//                     <button onClick={() => navigateImages(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
//                     <button onClick={() => navigateImages(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></button>
//                     <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">{currentPredictionIndex + 1} of {data[0].predictions.length}</div>
//                 </>
//             )}
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//             <div className="max-w-7xl mx-auto px-4 py-8">
//                 <header className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
//                     <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Vehicle Inspection Portal</h1>
//                     <p className="text-gray-600">Access comprehensive vehicle inspection records and detailed analysis reports.</p>
//                 </header>

//                 <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
//                     <form onSubmit={handleSearch} className="max-w-3xl mx-auto"><div className="flex flex-col sm:flex-row gap-4"><div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Registration Number</label><input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())} placeholder="Enter registration number (e.g., KA01AB1234)" className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300" disabled={loading} /></div><div className="sm:pt-3"><button type="submit" disabled={loading || !registrationNumber.trim()} className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Search Records</button></div></div></form>
//                 </section>

//                 <main className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 min-h-[540px]">
//                     {!hasSearched ? (
//                         <EmptyState type="initial" />
//                     ) : loading ? (
//                         <LoadingSpinner />
//                     ) : data.length > 0 && data[0].predictions?.length > 0 ? (
//                         <div className="lg:flex lg:gap-6">
//                             {/* Left column: vertical scrollable list */}
//                             <aside className="lg:w-1/3 border-r border-gray-100 p-4 max-h-[64vh] overflow-y-auto">
//                                 <div className="mb-4 flex items-center justify-between">
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-800">Records</h2>
//                                         <div className="text-sm text-gray-500">Vehicle: <span className="font-mono font-bold text-blue-600">{data[0].registration_number}</span></div>
//                                     </div>
//                                     <div className="text-sm text-gray-500">{data[0].predictions.length} Found</div>
//                                 </div>
//                                 <div className="space-y-3">
//                                     {data[0].predictions.map((p, i) => (
//                                         <RecordCard key={p._id || i} prediction={p} index={i} onImageClick={handleRecordClick} isActive={i === currentPredictionIndex} />
//                                     ))}
//                                 </div>
//                             </aside>

//                             {/* Right column: image + feedback */}
//                             <section className="lg:flex-1 p-6">
//                                 <div className="space-y-4">
//                                     <div className="flex items-start justify-between gap-4">
//                                         <div className="flex-1">
//                                             <h3 className="text-xl font-semibold text-gray-800">{selectedPrediction ? selectedPrediction.label : 'Select a record to view'}</h3>
//                                             <div className="text-sm text-gray-500 mt-1">Record {currentPredictionIndex + 1} of {data[0].predictions.length}</div>
//                                         </div>
//                                         <div className="flex gap-2">
//                                             <button onClick={() => navigateImages(-1)} className="px-3 py-2 bg-white border border-gray-200 rounded-md">Prev</button>
//                                             <button onClick={() => navigateImages(1)} className="px-3 py-2 bg-white border border-gray-200 rounded-md">Next</button>
//                                         </div>
//                                     </div>

//                                     <ImagePanel />

//                                     <div className="bg-white p-4 rounded-lg border">
//                                         <div className="flex items-center justify-between mb-3">
//                                             <h4 className="font-semibold text-gray-800">Feedback</h4>
//                                             <button onClick={() => setShowFeedbackPanel(!showFeedbackPanel)} className={`px-3 py-1 rounded ${showFeedbackPanel ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{showFeedbackPanel ? 'Hide' : 'Show'}</button>
//                                         </div>

//                                         <AnimatePresence>
//                                             {showFeedbackPanel && (
//                                                 <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
//                                                     <div className="space-y-3">
//                                                         <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Share your observations..." rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none" />

//                                                         <div className="bg-gray-50 p-3 rounded-md border">
//                                                             <div className="flex items-center justify-between">
//                                                                 <span className={`text-sm ${predictionSwitch ? 'text-green-600' : 'text-red-600'}`}>{predictionSwitch ? 'Accurate' : 'Not Accurate'}</span>
//                                                                 <div onClick={() => setPredictionSwitch(!predictionSwitch)} className={`relative w-14 h-7 rounded-full cursor-pointer ${predictionSwitch ? 'bg-green-500' : 'bg-gray-300'}`}>
//                                                                     <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${predictionSwitch ? 'translate-x-7' : ''}`}></div>
//                                                                 </div>
//                                                             </div>
//                                                             <p className="text-xs text-gray-400 mt-2">Toggle to indicate if the prediction matches your assessment.</p>
//                                                         </div>

//                                                         <div className="flex gap-2">
//                                                             <button onClick={handleSubmitFeedback} className="px-4 py-2 bg-green-600 text-white rounded-md">Submit Feedback</button>
//                                                             <button onClick={() => { setFeedback(''); }} className="px-4 py-2 bg-gray-100 rounded-md">Clear</button>
//                                                         </div>
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>
//                                     </div>

//                                 </div>
//                             </section>
//                         </div>
//                     ) : (
//                         <EmptyState type="noResults" regNumber={searchedRegNumber} />
//                     )}
//                 </main>

//             </div>

//             <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" toastClassName="backdrop-blur-sm bg-white/90" />
//         </div>
//     );
// }

// export default Udata;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE;

// ====================================================================
// Reusable UI Components
// ====================================================================

const EmptyState = ({ type, regNumber }) => {
    const states = {
        initial: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Search Vehicle Records", description: "Enter a registration number to view detailed vehicle inspection history and reports." },
        noResults: { icon: <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "No Records Found", description: `We couldn't locate any inspection records for vehicle "${regNumber}". Please verify the number and try again.` }
    };
    const state = states[type];
    return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-20 px-8 text-center">{state.icon}<h3 className="text-2xl font-semibold text-gray-700 mb-3">{state.title}</h3><p className="text-gray-500 max-w-lg leading-relaxed">{state.description}</p></motion.div>;
};

const LoadingSpinner = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center"><h3 className="text-lg font-semibold text-gray-700 mb-2">Searching Records</h3><p className="text-gray-500">Please wait while we fetch inspection data...</p></div>
    </motion.div>
);

const StatusBadge = ({ status }) => {
    const statusConfig = { 'good': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'ok': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'cracked': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'damaged': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' }, 'normal': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' }, 'default': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-400' } };
    const config = statusConfig[(status || '').toLowerCase()] || statusConfig.default;
    return <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}><div className={`w-2.5 h-2.5 rounded-full mr-3 ${config.dot}`}></div>{(status || '').charAt(0).toUpperCase() + (status || '').slice(1)}</span>;
};

const RecordCard = ({ prediction, index, onImageClick, isActive }) => (
    <motion.div
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        whileHover={{ scale: 1.01 }}
        className={`bg-white rounded-lg border transition-shadow duration-200 cursor-pointer p-4 flex items-start gap-3 ${isActive ? 'ring-2 ring-blue-300 shadow' : 'hover:shadow-md'}`}
        onClick={() => onImageClick(prediction, index)}
    >
        <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center text-blue-600 font-semibold">#{index + 1}</div>
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-800">{prediction.label || 'Unknown'}</h4>
                <StatusBadge status={prediction.label} />
            </div>
            <p className="text-xs text-gray-500">{prediction.description || ''}</p>
            <div className="text-xs text-gray-400 mt-2">{prediction.date ? new Date(prediction.date).toLocaleString() : ''}</div>
        </div>
    </motion.div>
);

// ====================================================================
// Main Component (Two column layout)
// - Desktop: same two-column behavior as before
// - Mobile: open a bottom-sheet modal when tapping a record (prevents page jump)
// ====================================================================
function Udata() {
    const [data, setData] = useState([]);
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [searchedRegNumber, setSearchedRegNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPredictionIndex, setCurrentPredictionIndex] = useState(0);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [predictionSwitch, setPredictionSwitch] = useState(true);
    const [showFeedbackPanel, setShowFeedbackPanel] = useState(false); // desktop right panel
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileSheet, setShowMobileSheet] = useState(false); // mobile bottom sheet

    // Image states
    const [imgLoading, setImgLoading] = useState(false);
    const [imgError, setImgError] = useState(false);

    // detect mobile breakpoint and listen to resize
    useEffect(() => {
        const check = () => {
            // treat widths < 768px as mobile
            setIsMobile(window.innerWidth < 768);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // prevent body scroll when mobile sheet open
    useEffect(() => {
        if (showMobileSheet) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => { document.body.style.overflow = prev; };
        }
    }, [showMobileSheet]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!registrationNumber.trim()) return toast.error("Please enter a registration number");
        setLoading(true); setHasSearched(true); setSearchedRegNumber(registrationNumber.trim()); setData([]);
        try {
            const response = await axios.get(`${API_BASE}/search?registrationNumber=${encodeURIComponent(registrationNumber.trim())}`);
            if (response.data?.length > 0) {
                setData(response.data);
                const preds = response.data[0].predictions || [];
                if (preds.length > 0) {
                    setSelectedPrediction(preds[0]);
                    setCurrentPredictionIndex(0);
                    toast.success(`Found ${preds.length} inspection records`);
                } else {
                    setSelectedPrediction(null);
                    toast.info("Vehicle found, but no inspection records yet.");
                }
            } else {
                setData([]);
                setSelectedPrediction(null);
                toast.info("No vehicle records found.");
            }
        } catch (error) { toast.error("Failed to fetch records"); } finally { setLoading(false); }
    };

    const getImageUrl = (p) => p ? (p.overlayFileId ? `${API_BASE}/file/${p.overlayFileId}` : (p.originalFileId ? `${API_BASE}/file/${p.originalFileId}` : "")) : "";

    // When a record is pressed:
    // - on desktop: select and open right pane (existing behavior)
    // - on mobile: open bottom sheet overlay (prevents page jump)
    const handleRecordClick = (prediction, index) => {
        setCurrentPredictionIndex(index);
        setSelectedPrediction(prediction);
        if (isMobile) {
            setShowMobileSheet(true);
        } else {
            setShowFeedbackPanel(true);
        }
    };

    const navigateImages = (direction) => {
        const predictions = data[0]?.predictions || [];
        if (predictions.length <= 1) return;
        let nextIndex = (currentPredictionIndex + direction + predictions.length) % predictions.length;
        setCurrentPredictionIndex(nextIndex);
        setSelectedPrediction(predictions[nextIndex]);
    };

    const handleSubmitFeedback = async () => {
        if (!data?.[0]) return toast.error("No record for feedback");
        try {
            await axios.post(`${API_BASE}/submitFeedback`, { registrationNumber: data[0].registration_number, feedback: feedback.trim(), predictionQuality: predictionSwitch ? "Accurate" : "Not Accurate" });
            toast.success("Thank you! Feedback submitted successfully");
            setFeedback("");
            // optimistic refresh: re-fetch records
            const event = { preventDefault: () => {} };
            await handleSearch(event);
            // close mobile sheet after submit if mobile
            if (isMobile) setShowMobileSheet(false);
        } catch (error) { toast.error("Failed to submit feedback"); }
    };

    // When selectedPrediction changes, reset image loader states
    useEffect(() => {
        if (selectedPrediction && getImageUrl(selectedPrediction)) {
            setImgLoading(true);
            setImgError(false);
        } else {
            setImgLoading(false);
            setImgError(true);
        }
    }, [selectedPrediction]);

    // Cubes loader
    const CubesLoader = () => (
        <div className="flex items-center justify-center h-full">
            <div className="cubes-loader inline-flex gap-2" role="status" aria-label="Image is loading">
                <div className="cube" />
                <div className="cube" />
                <div className="cube" />
                <div className="cube" />
            </div>
            <style>{`
                .cubes-loader .cube { width: 12px; height: 12px; background: rgba(255,255,255,0.9); border-radius: 2px; transform-origin: center bottom; animation: cubeWave 1s infinite ease-in-out; }
                .cubes-loader .cube:nth-child(1){ animation-delay: 0s; }
                .cubes-loader .cube:nth-child(2){ animation-delay: 0.12s; }
                .cubes-loader .cube:nth-child(3){ animation-delay: 0.24s; }
                .cubes-loader .cube:nth-child(4){ animation-delay: 0.36s; }
                @keyframes cubeWave {
                    0% { transform: translateY(0) scaleY(1); opacity: 0.6; }
                    30% { transform: translateY(-10px) scaleY(1.1); opacity: 1; }
                    60% { transform: translateY(0) scaleY(1); opacity: 0.8; }
                    100% { transform: translateY(0) scaleY(1); opacity: 0.6; }
                }
            `}</style>
        </div>
    );

    const CorruptedView = () => (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <svg className="w-16 h-16 mb-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="M7 10l5 5 5-5" />
                <path d="M4 7a4 4 0 0 1 8 0" />
            </svg>
            <div className="text-lg font-medium">Image corrupted</div>
            <div className="text-sm mt-1 text-gray-400">Source file unavailable or corrupted.</div>
        </div>
    );

    const ImagePanel = ({ compact=false }) => (
        <div className={`w-full ${compact ? 'h-64' : 'h-96'} bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative`}>
            {selectedPrediction && getImageUrl(selectedPrediction) ? (
                <>
                    <img
                        src={getImageUrl(selectedPrediction)}
                        alt={selectedPrediction?.label ? `Inspection - ${selectedPrediction.label}` : 'Vehicle Inspection'}
                        className="max-w-full max-h-full object-contain"
                        style={{ display: imgLoading ? 'none' : 'block' }}
                        onLoad={() => { setImgLoading(false); setImgError(false); }}
                        onError={() => { setImgLoading(false); setImgError(true); }}
                    />

                    {imgLoading && (<div className="absolute inset-0 flex items-center justify-center"><CubesLoader /></div>)}
                    {!imgLoading && imgError && (<div className="absolute inset-0 flex items-center justify-center"><CorruptedView /></div>)}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-lg">Image Not Available</span>
                    <span className="text-sm mt-1">Please check the source file</span>
                </div>
            )}

            {/* status badge */}
            {selectedPrediction && (<div className="absolute top-3 left-3"><StatusBadge status={selectedPrediction.label} /></div>)}

            {/* nav controls */}
            {data[0]?.predictions?.length > 1 && (
                <>
                    <button onClick={() => navigateImages(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
                    <button onClick={() => navigateImages(1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs">{currentPredictionIndex + 1} of {data[0].predictions.length}</div>
                </>
            )}
        </div>
    );

    // Mobile bottom sheet content (re-uses ImagePanel and feedback UI)
    const MobileSheet = () => (
        <AnimatePresence>
            {showMobileSheet && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
                >
                    {/* backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black"
                        onClick={() => setShowMobileSheet(false)}
                    />

                    {/* panel */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-xl bg-white rounded-t-xl shadow-xl p-4"
                        style={{ maxHeight: "92vh", overflow: "auto" }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h4 className="text-lg font-semibold">{selectedPrediction ? selectedPrediction.label : "Preview"}</h4>
                                <div className="text-xs text-gray-500">Record {currentPredictionIndex + 1} of {data[0]?.predictions?.length || 0}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => navigateImages(-1)} className="p-2 bg-gray-100 rounded-md">Prev</button>
                                <button onClick={() => navigateImages(1)} className="p-2 bg-gray-100 rounded-md">Next</button>
                                <button onClick={() => setShowMobileSheet(false)} className="p-2 ml-2 text-gray-600">Close</button>
                            </div>
                        </div>

                        <ImagePanel compact={true} />

                        <div className="mt-4">
                            <h5 className="font-medium mb-2">Feedback</h5>
                            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} placeholder="Share your observations..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                            <div className="flex items-center justify-between mt-3">
                                <div className="bg-gray-50 p-2 rounded-md border">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm ${predictionSwitch ? 'text-green-600' : 'text-red-600'}`}>{predictionSwitch ? 'Accurate' : 'Not Accurate'}</span>
                                        <div onClick={() => setPredictionSwitch(!predictionSwitch)} className={`relative w-14 h-7 rounded-full cursor-pointer ${predictionSwitch ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${predictionSwitch ? 'translate-x-7' : ''}`}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button onClick={handleSubmitFeedback} className="px-4 py-2 bg-green-600 text-white rounded-md">Submit</button>
                                    <button onClick={() => setFeedback('')} className="px-4 py-2 bg-gray-100 rounded-md">Clear</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">Vehicle Inspection Portal</h1>
                    <p className="text-gray-600">Access comprehensive vehicle inspection records and detailed analysis reports.</p>
                </header>

                <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto"><div className="flex flex-col sm:flex-row gap-4"><div className="flex-1"><label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Registration Number</label><input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())} placeholder="Enter registration number (e.g., KA01AB1234)" className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300" disabled={loading} /></div><div className="sm:pt-3"><button type="submit" disabled={loading || !registrationNumber.trim()} className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed shadow"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Search Records</button></div></div></form>
                </section>

                <main className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 min-h-[540px]">
                    {!hasSearched ? (
                        <EmptyState type="initial" />
                    ) : loading ? (
                        <LoadingSpinner />
                    ) : data.length > 0 && data[0].predictions?.length > 0 ? (
                        <div className="lg:flex lg:gap-6">
                            {/* Left column: vertical scrollable list */}
                            <aside className="lg:w-1/3 border-r border-gray-100 p-4 max-h-[64vh] overflow-y-auto">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-800">Records</h2>
                                        <div className="text-sm text-gray-500">Vehicle: <span className="font-mono font-bold text-blue-600">{data[0].registration_number}</span></div>
                                    </div>
                                    <div className="text-sm text-gray-500">{data[0].predictions.length} Found</div>
                                </div>
                                <div className="space-y-3">
                                    {data[0].predictions.map((p, i) => (
                                        <RecordCard key={p._id || i} prediction={p} index={i} onImageClick={handleRecordClick} isActive={i === currentPredictionIndex} />
                                    ))}
                                </div>
                            </aside>

                            {/* Right column: image + feedback (desktop) */}
                            <section className="lg:flex-1 p-6">
                                <div className="space-y-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800">{selectedPrediction ? selectedPrediction.label : 'Select a record to view'}</h3>
                                            <div className="text-sm text-gray-500 mt-1">Record {currentPredictionIndex + 1} of {data[0].predictions.length}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => navigateImages(-1)} className="px-3 py-2 bg-white border border-gray-200 rounded-md">Prev</button>
                                            <button onClick={() => navigateImages(1)} className="px-3 py-2 bg-white border border-gray-200 rounded-md">Next</button>
                                        </div>
                                    </div>

                                    <ImagePanel />

                                    <div className="bg-white p-4 rounded-lg border">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-gray-800">Feedback</h4>
                                            <button onClick={() => setShowFeedbackPanel(!showFeedbackPanel)} className={`px-3 py-1 rounded ${showFeedbackPanel ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{showFeedbackPanel ? 'Hide' : 'Show'}</button>
                                        </div>

                                        <AnimatePresence>
                                            {showFeedbackPanel && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                                    <div className="space-y-3">
                                                        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Share your observations..." rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none" />

                                                        <div className="bg-gray-50 p-3 rounded-md border">
                                                            <div className="flex items-center justify-between">
                                                                <span className={`text-sm ${predictionSwitch ? 'text-green-600' : 'text-red-600'}`}>{predictionSwitch ? 'Accurate' : 'Not Accurate'}</span>
                                                                <div onClick={() => setPredictionSwitch(!predictionSwitch)} className={`relative w-14 h-7 rounded-full cursor-pointer ${predictionSwitch ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                                    <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${predictionSwitch ? 'translate-x-7' : ''}`}></div>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-gray-400 mt-2">Toggle to indicate if the prediction matches your assessment.</p>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <button onClick={handleSubmitFeedback} className="px-4 py-2 bg-green-600 text-white rounded-md">Submit Feedback</button>
                                                            <button onClick={() => { setFeedback(''); }} className="px-4 py-2 bg-gray-100 rounded-md">Clear</button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                </div>
                            </section>
                        </div>
                    ) : (
                        <EmptyState type="noResults" regNumber={searchedRegNumber} />
                    )}
                </main>

            </div>

            {/* mobile sheet overlay (only appears on small devices when showMobileSheet true) */}
            {isMobile && <MobileSheet />}

            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" toastClassName="backdrop-blur-sm bg-white/90" />
        </div>
    );
}

export default Udata;
