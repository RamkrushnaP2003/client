import React, { useEffect, useState } from "react";
import { BOOK_API } from "../../utils/constant";
import BookCard from "./BookCard";

const BookStoreBody = () => {
  const [books, setBooks] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Sort By Price");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("bookName");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    console.log("Selected Filter:", event.target.value);
  };

  const sortBooks = (books, option) => {
    if (option === "Low to High") {
      return [...books].sort((a, b) => a.price - b.price);
    } else if (option === "High to Low") {
      return [...books].sort((a, b) => b.price - a.price);
    }
    return books;
  };

  const filterBooks = (books, query, filter) => {
    if (!query) return books;

    return books.filter((book) => {
      const filterValue = filter === "bookName" ? book.title : book[filter];
      console.log("Filtering by:", filter, "with value:", filterValue);
      console.log("Search Query:", query);
      if (!filterValue) return false;
      return filterValue.toLowerCase().includes(query.toLowerCase());
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BOOK_API}all-books`);
        const jsonResponse = await response.json();
        // console.log("Books Fetched:", jsonResponse);
        setBooks(jsonResponse);
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const sortedBooks = sortBooks(books, selectedOption);
  const filteredBooks = filterBooks(sortedBooks, searchQuery, selectedFilter);

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

        <form className="ml-4">
          <div className="flex items-center">
            <select
              value={selectedFilter}
              onChange={handleFilterChange}
              className="w-40 p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-l-lg rounded-r-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="bookName">Book Name</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
              <option value="publisher">Publisher</option>
            </select>
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg rounded-l-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder={`Search by ${
                selectedFilter === "bookName" ? "Book Name" : selectedFilter
              }`}
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>
      </div>

      {/* Render books */}
      <div className="flex flex-wrap">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard Book={book} key={book.bookId} />
          ))
        ) : (
          <p>No books found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BookStoreBody;
