import BookDetails from "./pages/BookDetail";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/BookDetail" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
