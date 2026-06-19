/* 
Purpose

This is the entry point of the React application.

Responsibilities:

React starts from here.
BrowserRouter is enabled here.
App component is rendered here.

*/


// Used to render React application into the browser
import ReactDOM from "react-dom/client";

// Enables routing functionality
// Required for React Router
import { BrowserRouter } from "react-router-dom";

// Main App component
import App from "./App";

// Global CSS file
import "./index.css";

// Attach React application to div#root in index.html
ReactDOM.createRoot(
  document.getElementById("root")
).render(

  // Enables navigation between pages
  <BrowserRouter>

    {/* Main Application */}
    <App />

  </BrowserRouter>
);