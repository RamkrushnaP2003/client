import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../userSlice";
import { USER_API } from "../../utils/constant";
// import { useSelector, useDispatch } from "react-redux";
// import { clearUser } from "../../userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Fetch user from Redux store
  const [imageUrl, setImageUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`${USER_API}profile-image/${user.userId}`)
        .then((response) => response.blob())
        .then((imageBlob) => {
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectURL);
        })
        .catch((error) =>
          console.error("Error fetching profile image:", error)
        );
    }
  }, [user]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   dispatch(clearUser()); // Clear user from Redux
  //   navigate("/login");
  // };

  // const user = useSelector((state) => state.user); // Get user from Redux
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(clearUser()); // Clear user state
  //   localStorage.removeItem("token"); // Remove token
  //   navigate("/login");
  // };

  const handleLogout = () => {
    dispatch(clearUser()); // Clear user state
    localStorage.removeItem("token"); // Remove token

    // Delay navigation by a few milliseconds to allow state changes to complete
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // console.log(user);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 shadow-md dark:shadow-gray-900">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://img.freepik.com/free-psd/books-stack-icon-isolated-3d-render-illustration_47987-15482.jpg?semt=ais_hybrid"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            e-Book Store
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user && (
            <>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen ? "true" : "false"}
              >
                <span className="sr-only">Open user menu</span>
                {imageUrl ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={imageUrl}
                    alt="user photo"
                  />
                ) : (
                  <p className="w-8 h-8 rounded-full">{user.firstName[0]}</p>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-8 top-14 mt-2 w-32 bg-white rounded-lg shadow-lg z-50 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-3">
                    <span className="block truncate text-sm text-gray-900 dark:text-white">
                      {user.firstName + " " + user.lastName}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/wishlist"
                        onClick={toggleDropdown}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        onClick={toggleDropdown}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${user.userId}/book-store`}
                        onClick={toggleDropdown}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        My Store
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {!user && (
            <Link to="/login">
              <button className="text-sm bg-blue-700 text-white rounded px-4 py-2">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
