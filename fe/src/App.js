import { Routes, Route, useLocation } from "react-router-dom";
import AuthorDetail from "./pages/AuthorDetail";
import AuthorList from "./pages/AuthorList";
import ReviewList from "./pages/BlogList";
import BookDetails from "./pages/BookDetail";
import BookList from "./pages/BookList";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";
import LayoutPage from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/Dashboard/UserManagement";

function App() {
  const location = useLocation(); // Lấy URL hiện tại

  // Các URL mà bạn muốn ẩn Header và Footer
  const hideHeaderFooterPaths = ["/login", "/signup", "/checkout", "/admin"];

  // Kiểm tra nếu URL hiện tại nằm trong danh sách cần ẩn Header và Footer
  const shouldHideHeaderFooter = hideHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      {!shouldHideHeaderFooter && <Header />} {/* Chỉ hiển thị nếu không thuộc các URL cần ẩn */}
      
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
        <Route path="/admin" element={<LayoutPage />}>
          <Route path="user-manage" element={<UserManagement />} />
        </Route>
      </Routes>

      {!shouldHideHeaderFooter && <Footer />} {/* Chỉ hiển thị nếu không thuộc các URL cần ẩn */}
    </div>
  );
}

export default App;
