import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FaCarSide, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import axios from "axios"; // Make sure to import axios

// Placeholder image (ensure this path is correct)
import TyreImage from '../assets/tyre-hero-image.png';

const API_BASE = import.meta.env.VITE_API_BASE;

// A reusable component to animate a number counting up
const AnimatedCounter = ({ to, precision = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(precision));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2.5, ease: "easeOut" });
    return controls.stop;
  }, [to, count, precision]);

  return <motion.span>{rounded}</motion.span>;
};

// Main Home Component
const Home = () => {
  // State for holding fetched stats and loading status
  const [stats, setStats] = useState({ tyresScanned: 0, detectionAccuracy: 0, defectsFound: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        // On error, we can keep the default stats (0s)
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []); // The empty array ensures this runs only once

  // Construct the stats array from the fetched state
  const statsData = [
    { value: stats.tyresScanned, label: "Total Tyres Scanned", icon: <FaCarSide className="text-blue-500" />, precision: 0 },
    { value: 82, label: "Detection Accuracy", icon: <FaCheckCircle className="text-green-500" />, precision: 1 },
    { value: stats.defectsFound, label: "Critical Defects Found", icon: <FaExclamationTriangle className="text-red-500" />, precision: 0 },
  ];

  return (
    <div className="h-full bg-slate-50 text-slate-800 flex items-center">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Advanced Tyre Integrity Analysis
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-slate-600 mb-8">
              Our AI-powered system provides instant, precise detection of tyre defects, enhancing vehicle safety and operational efficiency for fleets and service centers.
            </p>

            {/* Animated Statistics Section with Loading Skeletons */}
            <div className="flex flex-col sm:flex-row gap-8 my-10">
              {statsData.map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    {statsLoading ? (
                      <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                    ) : (
                      <p className="text-3xl font-bold text-slate-900">
                        <AnimatedCounter to={stat.value} precision={stat.precision} />
                        {stat.label.includes("Accuracy") ? "%" : ""}
                      </p>
                    )}
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/tollplaza" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105">
                Upload an Image
              </Link>
              <Link to="/getdb" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-105">
                View Reports
              </Link>
            </div>
          </motion.div>

          <motion.div className="hidden lg:block" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
            <img src={TyreImage} alt="High-performance vehicle tyre" className="w-full h-auto object-cover rounded-lg" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;