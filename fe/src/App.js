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
        <Route path="/book_detail/:bookId" element={<BookDetails />} />
        <Route path="/book_list" element={<BookList />} />
        <Route path="/blog_list" element={<ReviewList />} />
        <Route path="/author_list" element={<AuthorList />} />
        <Route path="/author_detail/:authorId" element={<AuthorDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/user_profile" element={<UserProfile />} />
      </Routes>
      <Footer/>
    </div>
  );
} 

export default App;
