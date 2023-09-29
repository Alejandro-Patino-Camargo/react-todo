import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

function LandingPage() {
  return (
    <div className="landingPage">
      <h1>Welcome to minimaList</h1>
      <p>A to-do app created with React.</p>
      <Link to="/todos">
        <button className="button">Go to Todos</button>
      </Link>
      <footer className="footer">
        <p>Created By Alejandro Patino Camargo </p>
      </footer>
    </div>
  );
}

export default LandingPage;
