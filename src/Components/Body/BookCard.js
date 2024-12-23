import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoHeartSharp } from "react-icons/io5";

const BookCard = ({ Book }) => {
  const [isLike, setIsLike] = useState(false);
  // console.log(Book);
  return (
    <div className="p-2 m-4 h-96 w-56 bg-white border border-gray-300 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-600 flex flex-col overflow-hidden">
      <div className="relative">
        <Link to={`/book/${Book.isbn}`}>
          <img
            className="shadow-md shadow-black rounded-t-lg h-56 w-full object-cover"
            src={Book.imageLink}
            alt={Book.title}
          />
        </Link>
        <IoHeartSharp
          onClick={() => setIsLike(!isLike)}
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
              className="w-4/12 text-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
