

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const NODE_UPLOAD_URL = `${import.meta.env.VITE_API_BASE}/uploads`;
// const NODE_CHECK_REG_URL = `${import.meta.env.VITE_API_BASE}/check-registration`;

// const Tg = () => {
//   const [Pn, setPn] = useState("");
//   const [Rn, setRn] = useState("");
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [registrationExists, setRegistrationExists] = useState(false);
//   const [checkingRn, setCheckingRn] = useState(false); // State to show loading for RN check

//   // Debounced function to check if registration number exists
//   const checkRegistrationExistence = useCallback(async (regNumber) => {
//     if (!regNumber || regNumber.length < 3) { // Only check for meaningful inputs
//       setRegistrationExists(false);
//       return;
//     }
//     setCheckingRn(true);
//     try {
//       const response = await axios.get(`${NODE_CHECK_REG_URL}/${regNumber}`);
//       setRegistrationExists(response.data.exists);
//     } catch (error) {
//       console.error("Error checking registration:", error);
//       setRegistrationExists(false); // Assume it doesn't exist on error
//     } finally {
//       setCheckingRn(false);
//     }
//   }, []);

//   // Effect to run the debounced check when Rn changes
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       checkRegistrationExistence(Rn);
//     }, 500); // Debounce time of 500ms

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [Rn, checkRegistrationExistence]);


//   const submitForm = async (e) => {
//     e.preventDefault();

//     if (!Rn) {
//       return toast.error("Registration Number is required.");
//     }

//     // Only require Phone Number if registration does NOT exist
//     if (!registrationExists && !Pn) {
//       return toast.error("Phone Number is required for new registrations.");
//     }

//     if (!image) {
//       return toast.error("Please select an image to upload.");
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("Rn", Rn);
//     // Only append Pn if it's provided (i.e., for new registrations)
//     if (Pn && !registrationExists) {
//         formData.append("Pn", Pn);
//     }
    
//     try {
//       const response = await axios.post(NODE_UPLOAD_URL, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         timeout: 120000,
//       });
//       toast.success(`Upload successful! Prediction: ${response.data.label}`);
//       // Reset only if successful
//       setPn("");
//       setRn("");
//       setImage(null);
//       document.getElementById("input-file").value = "";
//       setRegistrationExists(false); // Reset for next upload
//     } catch (error) {
//       console.error("Error uploading data:", error);
//       const msg = error.response?.data?.error || error.message || "An unknown error occurred.";
//       toast.error(`Error: ${msg}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const PnumUpdate = (e) => setPn(e.target.value.replace(/[^0-9]/g, "")); // Only allow digits for phone number
//   const RnumUpdate = (e) => setRn(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")); // Allow alphanumeric, uppercase for registration
//   const handleImageChange = (e) => setImage(e.target.files[0]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
//           Upload Tyre Image
//         </h2>
        
//         <form onSubmit={submitForm} className="space-y-6">
//           {/* Registration Number Input */}
//           <div>
//             <label htmlFor="reg-no" className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
//             <input 
//               type="text" 
//               placeholder="e.g., TS09AB1234" 
//               id="reg-no" 
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200" 
//               value={Rn} 
//               onChange={RnumUpdate} 
//               name="regNumber" 
//               required 
//             />
//             {checkingRn && Rn.length >= 3 && (
//               <p className="text-xs text-gray-500 mt-1">Checking registration...</p>
//             )}
//             {!checkingRn && Rn.length >=3 && (
//                 registrationExists ? (
//                     <p className="text-sm text-green-600 mt-1">Registration exists. Phone number not required.</p>
//                 ) : (
//                     <p className="text-sm text-yellow-600 mt-1">New registration. Phone number will be saved.</p>
//                 )
//             )}
//           </div>

//           {/* Phone Number Input - Conditionally Rendered */}
//           {!registrationExists && (
//             <div>
//               <label htmlFor="ph-no" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input 
//                 type="text" 
//                 placeholder="e.g., 9876543210" 
//                 id="ph-no" 
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200" 
//                 value={Pn} 
//                 onChange={PnumUpdate} 
//                 name="phoneNumber" 
//                 maxLength="10" // Assuming 10-digit phone numbers
//                 required={!registrationExists} // Required only if registration doesn't exist
//               />
//             </div>
//           )}

//           {/* Custom File Input */}
//           <div className="flex items-center space-x-4">
//             <label 
//               htmlFor="input-file" 
//               className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200 whitespace-nowrap"
//             >
//               Choose File
//             </label>
//             <div className="flex-1 p-2 border-2 border-dashed border-gray-300 rounded-lg text-center overflow-hidden">
//               {image ? (
//                 <span className="text-sm text-gray-700 truncate">{image.name}</span>
//               ) : (
//                 <span className="text-sm text-gray-400">No file selected</span>
//               )}
//             </div>
//             <input 
//               type="file" 
//               id="input-file" 
//               onChange={handleImageChange} 
//               className="hidden" 
//               accept="image/*" 
//               name="image" 
//               required // Always require an image
//             />
//           </div>
          
//           {/* Loading state or Submit Button */}
//           <div className="pt-4">
//             {loading ? (
//               <div className="flex justify-center items-center">
//                 <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//                 <p className="ml-3 font-semibold text-gray-700">Analyzing...</p>
//               </div>
//             ) : (
//               <button 
//                 type="submit"
//                 // Disable if no image, or if RN is new and Pn is missing
//                 disabled={!image || (!registrationExists && !Pn)} 
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 Submit for Analysis
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
//     </div>
//   );
// };

// export default Tg;


import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaCloudUploadAlt } from "react-icons/fa";

const NODE_UPLOAD_URL = `${import.meta.env.VITE_API_BASE}/uploads`;
const NODE_CHECK_REG_URL = `${import.meta.env.VITE_API_BASE}/check-registration`;

const Tg = () => {
    // Form State
    const [Pn, setPn] = useState("");
    const [Rn, setRn] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Logic State
    const [loading, setLoading] = useState(false);
    const [registrationExists, setRegistrationExists] = useState(false);
    const [checkingRn, setCheckingRn] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);

    const checkRegistrationExistence = useCallback(async (regNumber) => {
        if (!regNumber || regNumber.length < 4) {
            setRegistrationExists(false); return;
        }
        setCheckingRn(true);
        try {
            const response = await axios.get(`${NODE_CHECK_REG_URL}/${regNumber}`);
            setRegistrationExists(response.data.exists);
        } catch (error) {
            setRegistrationExists(false);
        } finally {
            setCheckingRn(false);
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => { checkRegistrationExistence(Rn); }, 500);
        return () => clearTimeout(handler);
    }, [Rn, checkRegistrationExistence]);

    const handleFileChange = (file) => {
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else if (file) { // if a file is selected but it's not an image
            toast.error("Please select a valid image file (e.g., JPG, PNG).");
        }
    };

    const handleDragEvents = (e, active) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(active);
    };

    const handleDrop = (e) => {
        handleDragEvents(e, false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        handleFileChange(file);
    };
    
    const resetForm = () => {
        setPn("");
        setRn("");
        setImage(null);
        setImagePreview(null);
        setRegistrationExists(false);
        const fileInput = document.getElementById("input-file");
        if (fileInput) fileInput.value = "";
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!Rn) return toast.error("Registration Number is required.");
        if (!registrationExists && !Pn) return toast.error("Phone Number is required for new registrations.");
        if (!image) return toast.error("Please select an image to upload.");

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);
        formData.append("Rn", Rn);
        if (Pn && !registrationExists) formData.append("Pn", Pn);
        
        try {
            const response = await axios.post(NODE_UPLOAD_URL, formData, { timeout: 120000 });
            toast.success(`Upload successful! Prediction: ${response.data.label}`);
            resetForm(); // Reset the form completely on success
        } catch (error) {
            const msg = error.response?.data?.error || "An unknown error occurred.";
            toast.error(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="container mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Column: Form */}
                    <div className="p-8 lg:p-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Toll Plaza Portal</h2>
                        <p className="text-gray-600 mb-8">Upload a tyre image for immediate analysis.</p>
                        
                        <form onSubmit={submitForm} className="space-y-6">
                            <div>
                                <label htmlFor="reg-no" className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                                <div className="relative">
                                    <input type="text" placeholder="Enter vehicle number" id="reg-no" className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={Rn} onChange={(e) => setRn(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} required />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        {checkingRn ? <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div> : Rn.length > 3 && (registrationExists ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-yellow-500" />)}
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {!registrationExists && Rn.length > 3 && !checkingRn && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                                        <label htmlFor="ph-no" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (New Vehicle)</label>
                                        <input type="text" placeholder="Enter 10-digit phone number" id="ph-no" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={Pn} onChange={(e) => setPn(e.target.value.replace(/[^0-9]/g, ""))} maxLength="10" required={!registrationExists} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tyre Image</label>
                                <div 
                                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                                    onDragOver={(e) => handleDragEvents(e, true)}
                                    onDragLeave={(e) => handleDragEvents(e, false)}
                                    onDrop={handleDrop}
                                >
                                    <FaCloudUploadAlt className={`mx-auto h-12 w-12 transition-colors ${isDragActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                                    <p className="mt-2 text-sm text-gray-600">Drag & drop a file here, or</p>
                                    <label htmlFor="input-file" className="mt-2 inline-block cursor-pointer font-semibold text-indigo-600 hover:text-indigo-800">browse to upload</label>
                                    <input type="file" id="input-file" onChange={(e) => handleFileChange(e.target.files[0])} className="hidden" accept="image/*" />
                                </div>
                            </div>
                            
                            <div className="pt-4">
                                <button type="submit" disabled={loading || !image} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {loading ? "Analyzing..." : "Submit for Analysis"}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Preview Only */}
                    <div className="bg-slate-50 rounded-r-2xl p-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div key={imagePreview || 'placeholder'} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full h-full">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                        <p className="mt-4 font-semibold text-gray-700">Processing Image...</p>
                                    </div>
                                ) : imagePreview ? (
                                    <div className="h-full flex flex-col">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Image Preview</h3>
                                        <img src={imagePreview} alt="Tyre Preview" className="w-full h-auto object-contain rounded-lg shadow-md flex-grow" />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                        <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <p className="mt-4 font-semibold">Image preview will appear here</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
};

export default Tg;