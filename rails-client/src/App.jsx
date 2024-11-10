import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PostsList from "./features/posts/PostsList.jsx";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import AppRoutes from "./components/AppRoutes.jsx"
function App() {
  return (
    <Router>
      <div className="app">
        <h1>React on Rails Blog</h1>
        <p>Find this application layout in rails-client/src/App.jsx</p>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
