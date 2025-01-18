import axios from "axios";

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

export const saveUser = async (user) => {
  try {
    // Determine coins based on role
    const coin = user.role === "worker" ? 10 : user.role === "buyer" ? 50 : 0;

    // Prepare user data
    const userData = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
      role: user?.role,
      coin: coin,
    };

    // Make the POST request
    await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, userData);
  } catch (error) {
    console.error("Error saving user:", error);
  }
};

export const checkUser = async (email) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/check/${email}`);
  const { exists, user: existingUser } = response.data;
  return [exists, existingUser]
};
