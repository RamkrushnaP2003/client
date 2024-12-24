import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Pages/Login.js";
import Register from "./Components/Pages/Register";
import BookStoreBody from "./Components/Body/BookStoreBody.js";
import SingleBookInfo from "./Components/Body/SingleBookInfo.js";
import MyStore from "./Components/Body/MyStore.js";
import PublishNewBook from "./Components/Body/PublishNewBook.js";
import EditBook from "./Components/Body/EditBook.js";
import Cart from "./Components/Body/Cart.js";
import Wishlist from "./Components/Body/Wishlist.js";

function AppLayout() {
  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-700 flex flex-col overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<BookStoreBody />} />
            <Route path="/book/:isbn" element={<SingleBookInfo />} />
            <Route path="/:userId/book-store" element={<MyStore />} />
            <Route
              path="/:userId/book-store/publish-new-book"
              element={<PublishNewBook />}
            />
            <Route
              path="/:userId/book-store/edit-book/:isbn"
              element={<EditBook />}
            />
            <Route path="/:userId/wishlist" element={<Wishlist />} />
            <Route path="/:userId/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
