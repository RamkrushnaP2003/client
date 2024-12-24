import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { USER_API } from "../../utils/constant";
import BookCard from "./BookCard";

const Wishlist = () => {
  const user = useSelector((state) => state.user);
  const [wishlist, setWishlist] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${USER_API}${user.userId}/wishlist`);
      const jsonResponce = await response.json();
      console.log(jsonResponce);
      setWishlist(jsonResponce.wishlist);
      console.log(wishlist);
    };
    fetchData();
  }, [user]);
  return wishlist ? (
    <div>
      {wishlist.map((book) => (
        <BookCard Book={book} key={book.bookId} />
      ))}
    </div>
  ) : (
    <h2>No books in your wishlist</h2>
  );
};

export default Wishlist;
