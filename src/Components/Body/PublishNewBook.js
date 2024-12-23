import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { USER_API } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const PublishNewBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    price: "",
    stockQuantity: "",
    isbn: "",
    trending: false,
    bestseller: false,
    publisher: "", // Automatically set to current user's name
    imageLink: "",
    userId: "", // This will be set from the logged-in user's data
  });

  const [status, setStatus] = useState({ success: false, message: "" });

  // Get the current logged-in user from Redux
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Update the publisher and userId when the user data is available
  useEffect(() => {
    if (user && user.firstName && user.lastName) {
      setFormData((prevState) => ({
        ...prevState,
        publisher: `${user.firstName} ${user.lastName}`, // Automatically set publisher
        userId: user.userId, // Set the logged-in user's userId
      }));
    }
  }, [user]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //   console.log(`${USER_API}${user.userId}/publish-book`);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the userId is present
    if (!formData.userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      // Send data using fetch
      const response = await fetch(`${USER_API}${user.userId}/publish-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Pass JWT in the Authorization header
        },
        body: JSON.stringify(formData),
      });

      // Check for success or error
      if (response.ok) {
        const responseData = await response.json();
        setStatus({ success: true, message: "Book published successfully!" });
        console.log(responseData);
        setTimeout(() => navigate(`/`), 2000);
      } else {
        throw new Error("Failed to publish the book.");
      }
    } catch (error) {
      setStatus({ success: false, message: `Error: ${error.message}` });
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="w-6/12 mx-auto p-6 my-6 bg-white shadow-md shadow-black rounded-lg dark:bg-gray-800">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Publish New Book
      </h2>
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Publish Book
        </button>

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
    </div>
  );
};

export default PublishNewBook;
