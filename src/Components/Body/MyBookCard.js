import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useState } from "react";
import { USER_API } from "../../utils/constant";

const MyBookCard = ({ Book }) => {
  const { imageLink, title, author, price, isbn } = Book; // Removed unused variables
  const user = useSelector((state) => state.user);
  const [showDialog, setShowDialog] = useState(false);
  const { userId } = useParams();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${USER_API}${userId}/delete-book/${isbn}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Book deleted successfully!");
        setShowDialog(false);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("An error occurred while deleting the book.");
    }
  };

  return (
    <div className="m-4">
      {Book && (
        <div>
          <div className="flex flex-row w-full min-w-sm p-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-2/12 h-96">
              <img
                className="h-80 w-60 shadow shadow-gray-300 dark:shadow-black m-auto"
                src={`${imageLink}`}
                alt={`${title} cover`}
              />
            </div>

            <div className="px-5 pb-5 w-8/12">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
              <div className="flex flex-row">
                <span className="text-md dark:text-white">By&nbsp;</span>
                <Link to={`book/${encodeURIComponent(author)}`}>
                  <h5 className="text-md tracking-tight italic hover:underline text-blue-500">
                    {author}
                  </h5>
                </Link>
              </div>
              <div className="flex items-center mt-2.5 mb-5">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ₹
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                    .format(price)
                    .replace("₹", "")}
                </span>
              </div>
            </div>
            <div className="w-2/12 p-4 flex justify-center items-center">
              <div className="bg-gradient-to-b from-white to-gray-200 dark:from-gray-800 dark:to-gray-600 h-64 w-60 rounded-xl flex items-center justify-center ">
                <div className="bg-white h-60 w-56 flex justify-center items-center flex-col border dark:border-gray-900 rounded-lg shadow-md dark:bg-gray-800">
                  <Link to={`/${user.userId}/book-store/${isbn}`}>
                    <button
                      className="w-36 shadow shadow-black text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 cursor-pointer my-2.5"
                      aria-label="View book details"
                    >
                      View <FaEye className="inline mt-[-2px]" />
                    </button>
                  </Link>
                  <Link to={`/${user.userId}/book-store/edit-book/${isbn}`}>
                    <button
                      className="w-36 shadow shadow-black text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer my-2.5"
                      aria-label="Edit book"
                    >
                      Edit <FaEdit className="inline mt-[-4px] " />
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowDialog(true)}
                    className="w-36 shadow shadow-black text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer my-2.5"
                    aria-label="Delete book"
                  >
                    Delete <AiFillDelete className="inline mt-[-4px]" />
                  </button>
                </div>
                {showDialog && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-950 dark:text-white">
                      <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                      <p className="mb-4">
                        Are you sure you want to delete this book?
                      </p>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setShowDialog(false)}
                          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDelete}
                          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookCard;
