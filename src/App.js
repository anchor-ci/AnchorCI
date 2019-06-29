import React from 'react';
import Navbar from './components/navbar.js';
import Job from './pages/job.js';
import Index from './pages/index.js';
import HomePage from './pages/homepage.js';
import ProtectedRoute from './components/protected_route.js';
import { BrowserRouter, Route } from "react-router-dom";

const style = {
  height: "100%",
  width: "100%",
  margin: "0px",
  padding: "0px"
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <ProtectedRoute exact path="/home" component={HomePage} />
        <Route exact path="/" component={Index} />
        <Route path="/job/:jobId" component={Job} />
      </div>
    </BrowserRouter>
  );
}

export default App;
