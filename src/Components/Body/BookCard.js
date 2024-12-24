import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";
import { USER_API } from "../../utils/constant";
import { useSelector } from "react-redux";

const BookCard = ({ Book }) => {
  const [isLike, setIsLike] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLike = async (isbn) => {
    try {
      if (!user || !user.userId) {
        alert("You must be logged in to add books to your wishlist.");
        setTimeout(() => navigate("/login"), 1000);
        return;
      }

      const response = await fetch(
        `${USER_API}${user.userId}/add-to-wishlist/${isbn}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert("Book added to wishlist!");
      setIsLike(true);
    } catch (error) {
      console.error(error.message);
      alert("Failed to add book to wishlist.");
    }
  };

  const handleCart = async (isbn) => {
    try {
      // Ensure user is logged in
      if (!user || !user.userId) {
        alert("You must be logged in to add books to your cart.");
        setTimeout(() => navigate("/login"), 1000);
        return;
      }

      const response = await fetch(
        `${USER_API}${user.userId}/add-to-cart/${isbn}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      alert("Book added to cart!");
      setTimeout(() => navigate(`${user.userId}/cart`), 1000);
      // setIsLike(true);
    } catch (error) {
      console.error(error.message);
      alert("Failed to add book to cart.");
    }
  };

  return (
    <div className="p-2 m-8 h-[32rem] w-[18.5rem] bg-white border border-gray-300 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-600 flex flex-col overflow-hidden">
      <div className="relative">
        {Book.bestseller && (
          <>
            <span className="absolute top-2 right-[-10px] bg-yellow-500 text-gray-950 text-xs font-bold py-1 px-2 rounded-l-md z-30">
              Bestseller
            </span>
          </>
        )}
        <Link to={`/book/${Book.isbn}`}>
          <img
            className="shadow-md shadow-black rounded-t-lg h-80 w-full object-cover z-20"
            src={Book.imageLink}
            alt={Book.title}
          />
        </Link>
        <IoHeartSharp
          onClick={() => {
            setIsLike(!isLike);
            handleLike(Book.isbn); // Trigger API call when the heart icon is clicked
          }}
          className={
            isLike
              ? `absolute top-2 left-2 text-2xl text-red-600 z-10 cursor-pointer`
              : `absolute top-2 left-2 text-2xl text-gray-900 z-10 cursor-pointer`
          }
        />
      </div>

      <div className="p-2 flex flex-col flex-grow justify-between">
        <div className="mb-2">
          <Link to={`/book/${Book.bookId}`}>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate">
              {Book.title}
            </h5>
          </Link>
          <p className="mb-3 text-sm font-normal text-gray-700 tracking-tight dark:text-gray-400 truncate">
            {Book.author}
          </p>
        </div>

        <div className="mt-auto">
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            ₹
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            })
              .format(Book.price)
              .replace("₹", "")}
          </p>
          <div className="flex flex-wrap flex-row justify-evenly">
            <a
              href="#"
              className="w-4/12 text-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
            >
              Buy
            </a>
            <a
              href="#"
              onClick={() => handleCart(Book.isbn)}
              className="w-4/12 text-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
            >
              Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
