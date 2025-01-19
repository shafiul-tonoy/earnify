import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { successAlert, errorAlert } from "../../utilities/sweetalert2";
import { useState } from "react";
import CustomTitle from "../../components/CustomTitle";
import Loading from "../../components/Loading";
import { saveUser, checkUser } from "../../api/utilis";

export default function Login() {
  const { login, signInWithGoogle, loading, setUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state ? location.state : "/dashboard";
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (loading) return <Loading />;
  if (user) return <Navigate to={from} replace={true} />;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      successAlert("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.code);
      errorAlert("Failed to login. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Check if the user already exists in the database
      const [exists, existingUser] = await checkUser(user.email); // Use await and pass the email

      if (!exists) {
        // If user doesn't exist, save the user with the role "worker"
        await saveUser({ ...user, role: "worker" });
      }

      // Set the user in state
      setUser(existingUser || user);

      // Show success alert
      successAlert("Logged in successfully!");

      // Navigate to the appropriate page
      navigate(from, { replace: true });
    } catch (err) {
      // Set error if any occurs during the sign-in process
      setError(err?.message || "An error occurred during Google sign-in.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <CustomTitle title="Login" />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Login to Earnify
          </h2>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm font-semibold text-red-500 my-2">
              ** {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>

          {/* Google Login */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full 
            px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2
             focus:ring-gray-400 flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle size="16" />
              Continue with Google
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </>
  );
}
