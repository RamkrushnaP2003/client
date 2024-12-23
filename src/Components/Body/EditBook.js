import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BOOK_API, USER_API } from "../../utils/constant";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { userId, isbn } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // States
  const [formData, setFormData] = useState({
    bookId: "",
    title: "",
    author: "",
    genre: "",
    description: "",
    price: "",
    stockQuantity: "",
    isbn: isbn, // Set isbn from params
    trending: false,
    bestseller: false,
    publisher: "",
    imageLink: "",
    userId: userId, // Set userId from params
  });

  const [status, setStatus] = useState({ success: false, message: "" });

  // Populate initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BOOK_API}book-info/${isbn}`);
        if (response.ok) {
          const bookData = await response.json();
          setFormData((prev) => ({
            ...prev,
            ...bookData,
          }));
        } else {
          throw new Error("Failed to fetch book data.");
        }
      } catch (error) {
        setStatus({ success: false, message: `Error: ${error.message}` });
      }
    };

    fetchData();
  }, [isbn]);

  // Set publisher and userId from the user state
  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      setFormData((prevState) => ({
        ...prevState,
        publisher: `${user.firstName} ${user.lastName}`,
        userId: userId,
      }));
    }
  }, [user, userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await fetch(`${USER_API}${userId}/update-book/${isbn}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (response.ok) {
  //         setStatus({ success: true, message: "Book updated successfully!" });
  //         alert("Book updated successfully!");
  //         setTimeout(() => navigate(userId + "/book-store"), 2000);
  //       } else {
  //         throw new Error("Failed to update the book.");
  //       }
  //     } catch (error) {
  //       setStatus({ success: false, message: `Error: ${error.message}` });
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show a confirmation dialog before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to update this book?"
    );

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${USER_API}${userId}/update-book/${isbn}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setStatus({ success: true, message: "Book updated successfully!" });
          alert("Book updated successfully!");
          // setTimeout(() => navigate(`/`), 1000);
          setTimeout(() => navigate(`/${userId}/book-store`), 2000);
        } else {
          throw new Error("Failed to update the book.");
        }
      } catch (error) {
        setStatus({ success: false, message: `Error: ${error.message}` });
      }
    } else {
      alert("Update canceled.");
    }
  };

  return (
    <div className="w-6/12 mx-auto p-6 my-6 bg-white shadow-md shadow-black rounded-lg dark:bg-gray-800">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Edit Book
      </h2>
      {formData && (
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter genre"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter book description"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Stock Quantity */}
          <div className="mb-4">
            <label
              htmlFor="stockQuantity"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stockQuantity"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* ISBN */}
          <div className="mb-4">
            <label
              htmlFor="isbn"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              disabled
              value={formData.isbn}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter ISBN"
            />
          </div>

          {/* Publisher */}
          <div className="mb-4">
            <label
              htmlFor="publisher"
              className="mb-2 hidden text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Publisher
            </label>
            <input
              type="text"
              disabled
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="bg-gray-50 hidden border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter publisher name"
            />
          </div>

          {/* Image Link */}
          <div className="mb-4">
            <label
              htmlFor="imageLink"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Image Link
            </label>
            <input
              type="url"
              id="imageLink"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter image URL"
            />
          </div>

          {/* Trending */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="trending"
                name="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                Trending
              </span>
            </label>
          </div>

          {/* Bestseller */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="bestseller"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                Bestseller
              </span>
            </label>
          </div>

          <div className="flex flex-row justify-between">
            <button
              type="submit"
              className="mx-2 inline bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Book
            </button>
            <Link to={`/${userId}/book-store`}>
              <button className="ml-4 inline-block bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Cancel
              </button>
            </Link>
          </div>

          {status.message && (
            <p
              className={`mt-4 text-sm ${
                status.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default EditBook;
