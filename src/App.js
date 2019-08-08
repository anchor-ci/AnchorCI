import React from 'react';
import Navbar from './components/navbar.js';
import History from './pages/job.js';
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
      <div style={{height: "100%"}}>
        <Navbar />
        <Route exact path="/" component={homepage} />
        <Route exact path="/history/:historyId" component={History} />
      </div>
    </BrowserRouter>
  );
}

export default App;
