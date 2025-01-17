import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveUser } from "../../api/utilis";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.profilePicture[0];
    const photoURL = await imageUpload(image);

    const user = {
      displayName: data.name,
      email: data.email,
      photoURL: photoURL,
      role: data.role,
      password: data.password,
    };

    try {
      //2. User firebase Registration
      await createUser(user.email, user.password);

      //3. Save username & profile photo
      await updateUserProfile(name, photoURL);

      // save user info in db if the user is new
      await saveUser(user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Register for Earnify
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className={`w-full px-4 py-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Profile Picture Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            {...register("profilePicture", {
              required: "Profile picture is required",
            })}
            className="w-full"
          />
          {errors.profilePicture && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profilePicture.message}
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
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*])/,
                message: "Password must include at least one special character",
              },
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

        {/* Role Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a role</option>
            <option value="worker">Worker</option>
            <option value="buyer">Buyer</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
