/*
Purpose

Acts as the root component.

Instead of placing all routes here, we delegate routing responsibility to AppRoutes.
*/

// Contains all application routes
import AppRoutes from "./routes/AppRoutes";


function App() {

  return (

    // Render route configuration
    <AppRoutes />

  );
}

export default App;