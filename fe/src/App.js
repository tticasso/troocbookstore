import AuthorDetail from "./pages/AuthorDetail";
import AuthorList from "./pages/AuthorList";
import ReviewList from "./pages/BlogList";
import BookDetails from "./pages/BookDetail";
import BookList from "./pages/BookList";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import CheckoutPage from "./pages/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/dashboard/DashBoard";
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/BookDetail" element={<BookDetails />} />
        <Route path="/BookList" element={<BookList />} />
        <Route path="/ReviewList" element={<ReviewList />} />
        <Route path="/AuthorList" element={<AuthorList />} />
        <Route path="/AuthorDetail" element={<AuthorDetail />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
