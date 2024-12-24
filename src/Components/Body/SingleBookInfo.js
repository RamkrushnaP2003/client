import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { BOOK_API, USER_API } from "../../utils/constant";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";

const SingleBookInfo = () => {
  const [book, setBook] = useState(null);
  const [booksWithSameAuthor, setBooksWithSameAuthor] = useState(null);
  const [booksWithSameGenre, setBooksWithSameGenre] = useState(null);
  const [booksWithSamePublisher, setBooksWithSamePublisher] = useState(null);
  const params = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BOOK_API}book-info/${params.isbn}`);
        const jsonResponse = await response.json();
        setBook(jsonResponse);
        console.log(jsonResponse);
      } catch (err) {
        console.error("Error : " + err);
      }
    };
    fetchData();
  }, [params.isbn]);

  const handleLike = async (isbn) => {
    try {
      // Ensure user is logged in
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
      // setIsLike(true); // Toggle the like state
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
      setTimeout(() => navigate(`/${user.userId}/cart`), 1000);
      // setIsLike(true);
    } catch (error) {
      console.error(error.message);
      alert("Failed to add book to cart.");
    }
  };

  useEffect(() => {
    const fetchBooksWithSimilarAuthor = async () => {
      if (!book) return;

      try {
        const author = encodeURIComponent(book.author);
        const title = encodeURIComponent(book.title);

        const response = await fetch(
          `${BOOK_API}books-by-author?author=${author}&title=${title}`
        );

        if (!response.ok) {
          console.error("Error fetching books:", await response.text());
          return;
        }

        const jsonResponse = await response.json();
        setBooksWithSameAuthor(jsonResponse.books || []);
      } catch (err) {
        console.error("Error fetching books with same author:", err);
      }
    };
    fetchBooksWithSimilarAuthor();
  }, [book]);

  useEffect(() => {
    const fetchBooksWithSimilarGenre = async () => {
      try {
        if (book) {
          const genre = book.genre.split(" ").join("%20");
          const title = book.title.split(" ").join("%20");

          const response = await fetch(
            `${BOOK_API}books-by-genre?genre=${genre}&excludeTitle=${title}`
          );
          const jsonResponse = await response.json();
          setBooksWithSameGenre(jsonResponse.books || []);
        }
      } catch (err) {
        console.error("Error fetching books with similar genre:", err);
      }
    };

    fetchBooksWithSimilarGenre();
  }, [book]);

  useEffect(() => {
    const fetchBooksWithSimilarPublisher = async () => {
      try {
        if (book) {
          const publisher = book.publisher.split(" ").join("%20");
          const title = book.title.split(" ").join("%20");

          const response = await fetch(
            `${BOOK_API}books-by-publisher?publisher=${publisher}&excludeTitle=${title}`
          );
          const jsonResponse = await response.json();
          setBooksWithSamePublisher(jsonResponse.books || []);
        }
      } catch (err) {
        console.error("Error fetching books with similar publisher:", err);
      }
    };
    fetchBooksWithSimilarPublisher();
  }, [book]);

  return (
    <div className="m-4">
      {book && (
        <div>
          <div className="flex flex-row w-full min-w-sm p-8 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="w-2/12 h-96">
              <img
                className="h-80 w-60 shadow shadow-gray-300 dark:shadow-black m-auto"
                src={`${book.imageLink}`}
                alt="product image"
              />
            </div>

            <div className="px-5 pb-5 w-8/12">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <div className="flex flex-row">
                <a className="text-md dark:text-white">By &nbsp;:</a>
                <Link to={`book/${encodeURIComponent(book.author)}`}>
                  <h5 className="text-md tracking-tight italic hover:underline text-blue-500 ">
                    &nbsp;{book.author}&nbsp;
                  </h5>
                </Link>
                <h2 className="text-md dark:text-white">
                  (Author)&nbsp;|&nbsp;
                </h2>
                <a className="text-md dark:text-white">
                  Publisher &nbsp;:&nbsp;
                </a>
                <Link to={`book/${encodeURIComponent(book.publisher)}`}>
                  <h5 className="text-md tracking-tight italic text-blue-500 hover:underline">
                    &nbsp;{book.publisher}&nbsp;
                  </h5>
                </Link>
              </div>
              <div className="flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {/* Add your stars or rating components here */}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
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
                    .format(book.price)
                    .replace("₹", "")}
                </span>
              </div>
            </div>
            <div className="w-2/12 p-4 flex justify-center items-center">
              <div className="bg-gradient-to-b from-white to-gray-200 dark:from-gray-800 dark:to-gray-600 h-64 w-60 rounded-xl flex items-center justify-center ">
                <div className="bg-white h-60 w-56 flex justify-center items-center flex-col border dark:border-gray-900 rounded-lg shadow-md dark:bg-gray-800">
                  <h2
                    onClick={() => handleCart(book.isbn)}
                    className="w-36 shadow shadow-black text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer my-2.5"
                  >
                    Add to cart
                  </h2>
                  <h2 className="w-36 shadow shadow-black text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 cursor-pointer my-2.5">
                    Buy Now
                  </h2>
                  <h2
                    onClick={() => handleLike(book.isbn)}
                    className="w-36 shadow shadow-black text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800 cursor-pointer my-2.5"
                  >
                    Add to Wishlist
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap flex-col">
            {booksWithSameAuthor && booksWithSameAuthor.length !== 0 && (
              <div className="m-4">
                <hr className="mb-4 text-red-500" />
                <h1 className="text-gray-700 italic dark:text-white">
                  By : {book.author}
                </h1>
                {booksWithSameAuthor.map((book) => (
                  <BookCard Book={book} key={book.bookId} />
                ))}
              </div>
            )}
            {booksWithSameGenre && booksWithSameGenre.length !== 0 && (
              <div className="m-4">
                <hr className="mb-4 text-red-500" />
                <h1 className="text-gray-700 italic dark:text-white">
                  Genre : {book.genre}
                </h1>
                <div className="flex overflow-x-auto space-x-4 py-4">
                  {booksWithSameGenre.map((book) => (
                    <div key={book.bookId} className="flex-shrink-0">
                      <BookCard Book={book} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {booksWithSamePublisher && booksWithSamePublisher.length !== 0 && (
              <div className="m-4">
                <hr className="mb-4 text-red-500" />
                <h1 className="text-gray-700 italic dark:text-white">
                  Publisher : {book.publisher}
                </h1>
                {booksWithSamePublisher.map((book) => (
                  <BookCard Book={book} key={book.bookId} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBookInfo;
