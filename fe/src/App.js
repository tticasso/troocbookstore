import AuthorDetail from "./pages/AuthorDetail";
import AuthorList from "./pages/AuthorList";
import ReviewList from "./pages/BlogList";
import BookDetails from "./pages/BookDetail";
import BookList from "./pages/BookList";
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
        <Route path="/BookList" element={<BookList />} />
        <Route path="/ReviewList" element={<ReviewList />} />
        <Route path="/AuthorList" element={<AuthorList />} />
        <Route path="/AuthorDetail" element={<AuthorDetail />} />
      </Routes>
    </div>
  );
}

export default App;
