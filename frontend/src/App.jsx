import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
// import Model from "./pages/Model";
import Analytics from "./pages/Analytics";
import Datasets from "./pages/Datasets";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";

function App() {


//  Function to set the active tab 
  const SidebarRouterWrapper = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("dashboard");
  
    useEffect(() => {
      const path = location.pathname;
      const tab = path === "/" ? "dashboard" : path.replace("/", "");
      setActiveTab(tab);
    }, [location.pathname]);
  
    return <Sidebar activeTab={activeTab} />;
  };


  return (
    <Router>
      <div className="app-container" style={{ display: "flex" }}>
        <SidebarRouterWrapper />

        <div className="main-content" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/model" element={<Model />} /> */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
