import React, { useEffect, useState } from "react";
import { BOOK_API } from "../../utils/constant";
import BookCard from "./BookCard";

const BookStoreBody = () => {
  const [books, setBooks] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Sort By Price");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const booksPerPage = 10; // Number of books per page

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchBookChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const sortBooks = (books, option) => {
    if (option === "Low to High") {
      return [...books].sort((a, b) => a.price - b.price);
    } else if (option === "High to Low") {
      return [...books].sort((a, b) => b.price - a.price);
    }
    return books;
  };

  const filterBooks = (books, query) => {
    if (!query) return books;

    return books.filter((book) => {
      const combinedFields = `${book.title} ${book.author} ${book.genre} ${book.publisher}`;
      return combinedFields.toLowerCase().includes(query.toLowerCase());
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BOOK_API}all-books`);
        const jsonResponse = await response.json();
        setBooks(jsonResponse);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const sortedBooks = sortBooks(books, selectedOption);
  const filteredBooks = filterBooks(sortedBooks, search);

  // Pagination logic
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        <div className="ml-4 mb-4">
          <select
            value={selectedOption}
            onChange={handleChange}
            className="w-30 p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Sort By Price">Sort By Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>

        <div>
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg ml-4 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search by any field (e.g., Book Name, Author, Publisher, Genre)"
            required
            value={search}
            onChange={handleSearchBookChange}
          />
        </div>
      </div>

      {/* Render books */}
      <div className="flex flex-wrap">
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => <BookCard Book={book} key={book.bookId} />)
        ) : (
          <p>No books found matching your search criteria.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50 dark:bg-gray-800 dark:text-white"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-800 dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 text-gray-800 rounded disabled:opacity-50 dark:bg-gray-800 dark:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookStoreBody;
