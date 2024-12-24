import React, { useEffect, useState } from "react";
import { USER_API } from "../../utils/constant";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [cart, setCart] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${USER_API}${user.userId}/cart`);
      const jsonResponce = await response.json();
      console.log(jsonResponce);
      setCart(jsonResponce.cart);
      console.log(cart);
    };
    fetchData();
  }, [user]);
  return cart ? (
    <div>
      {cart.map((book) => (
        <BookCard Book={book} key={book.bookId} />
      ))}
    </div>
  ) : (
    <h2>No books in your cart</h2>
  );
};

export default Cart;
