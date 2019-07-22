import React from 'react';
import Navbar from './components/navbar.js';
import Job from './pages/job.js';
import Index from './pages/index.js';
import ProtectedRoute from './components/protected_route.js';
import { loggedIn } from './utils.js';
import { LoggedInHomepage, LoggedOutHomepage } from './pages/homepage.js';
import { BrowserRouter, Redirect, Route } from "react-router-dom";

const style = {
  height: "100%",
  width: "100%",
  margin: "0px",
  padding: "0px"
}

function App() {
  const homepage = loggedIn() ? LoggedInHomepage : LoggedOutHomepage

  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Route exact path="/" component={homepage} />
        <ProtectedRoute path="/job/:jobId" component={Job} />
      </div>
    </BrowserRouter>
  );
}

export default App;
