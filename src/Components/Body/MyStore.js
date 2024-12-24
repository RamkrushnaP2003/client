import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BOOK_API } from "../../utils/constant";
import MyBookCard from "./MyBookCard";

const MyStore = () => {
  const user = useSelector((state) => state.user);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.userId) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BOOK_API}${user.userId}/store`);

        if (!response.ok) {
          const message = `Error: ${response.status} - ${response.statusText}`;
          console.warn(message);
          setError(message);
          setLoading(false);
          return;
        }

        const jsonResponse = await response.json();
        setMyBooks(jsonResponse.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user || !user.userId) {
    return (
      <p className="text-center text-red-500 mt-4">
        User not found, please login again.
      </p>
    );
  }

  return (
    <div className="h-[93vh]">
      <span className="block text-center text-white mt-6">
        <Link
          to={`/${user.userId}/book-store/publish-new-book`}
          className="text-blue-700 hover:underline"
        >
          <button className="text-sm bg-blue-700 text-white rounded px-4 py-2">
            Publish New Book
          </button>
        </Link>
      </span>

      {/* Loading state */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}

      {/* Error state */}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Render Books */}
      {!loading && !error && (
        <div className="mt-4">
          {myBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto">
              {myBooks.map((book) => (
                <MyBookCard Book={book} key={book.bookId} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No books available in your store.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyStore;
