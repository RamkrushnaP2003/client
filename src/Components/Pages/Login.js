import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { USER_API } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { setUser } from "../../userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${USER_API}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, passwordHash: password }),
      });

      const jsonResponse = await response.json();

      if (response.ok) {
        // Dispatch user to Redux store
        dispatch(setUser(jsonResponse.user));

        // Optionally store the token in localStorage
        localStorage.setItem("token", jsonResponse.token);

        navigate("/");
      } else {
        setError(jsonResponse.message || "Failed to login.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url()` }}
    >
      <div className="bg-black bg-opacity-40 p-8 rounded-lg shadow-md w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center text-white">Login</h2>

          {/* Email TextField */}
          <TextField
            fullWidth
            variant="standard"
            label="Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "rgba(0, 0, 0, 0)",
              },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
          />

          {/* Password TextField */}
          <TextField
            fullWidth
            variant="standard"
            label="Password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "rgba(0, 0, 0, 0)",
              },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
          />

          {/* Success or Error Message */}
          {success && <p className="text-green-600 text-center">{success}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
          >
            LOG IN
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-white mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
