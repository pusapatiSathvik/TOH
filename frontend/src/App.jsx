import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar.jsx";
import Home from "./Home/Home.jsx";
import Tg from "./TG/Tg.jsx";
import Table from "./Dealer/Table.jsx";
import DetailView from "./Dealer/DetailView.jsx";
import Udata from "./User/Udata.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        <Navbar />

        {/* CORRECTION: 
          Padding has been removed from this <main> tag.
          This allows child components like Home.jsx to fill the screen completely.
          Other components (Table, DetailView, etc.) will have their own padding.
        */}
        <main className="flex-grow overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tollplaza" element={<Tg />} />
            <Route path="/user-data" element={<Udata />} />
            <Route path="/getdb" element={<Table />} />
            <Route path="/detail/:registrationNumber" element={<DetailView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;