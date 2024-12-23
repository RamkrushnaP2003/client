import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { USER_API } from "../../utils/constant";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      if (updatedData.password && updatedData.confirmPassword) {
        setPasswordMatch(updatedData.password === updatedData.confirmPassword);
      }

      return updatedData;
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    setSuccess("");

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      passwordHash: formData.password,
    };

    try {
      const registerResponse = await fetch(`${USER_API}new-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!registerResponse.ok) {
        const errorResponse = await registerResponse.json();
        console.error("Registration error:", errorResponse);
        setErrorMessage(errorResponse.message || "Failed to register user.");
        return;
      }

      const registerData = await registerResponse.json();
      const userId = registerData.userId; // Extract user ID from response

      console.log("User registered:", registerData);

      // If profile image is provided, upload it
      if (imageFile && userId) {
        const formDataImage = new FormData();
        formDataImage.append("profileImage", imageFile);
        formDataImage.append("userId", userId);

        const uploadResponse = await fetch(`${USER_API}upload-profile-image`, {
          method: "POST",
          body: formDataImage,
        });

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          setErrorMessage(
            uploadError.message || "Failed to upload profile image."
          );
          return;
        }

        const uploadData = await uploadResponse.json();
        console.log("Profile image uploaded:", uploadData);
      }

      setSuccess("User Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      // style={{ backgroundImage: "url('/assets/register2.avif')" }}
    >
      <div className="bg-black bg-opacity-40 p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-white">
            Create an Account
          </h2>
          {/* Form fields */}
          <TextField
            fullWidth
            variant="standard"
            label="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!passwordMatch && (
            <p className="text-red-600">Passwords do not match</p>
          )}

          {/* File input for profile image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="text-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
            disabled={!passwordMatch}
          >
            REGISTER
          </button>

          {success && <p className="text-green-500 text-center">{success}</p>}
          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}
        </form>
        <span className="block text-center text-white mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
