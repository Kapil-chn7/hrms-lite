/*
 * @Author: Kapil Chauhan
 * @Problem: 
 * @Started: Do not edit
 * @LastEdited: Do not edit
 */
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeesPage from "./pages/EmployeesPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
