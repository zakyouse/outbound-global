import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";

const Login = ({ setUserId }) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("Please enter both user name and password.");
      return;
    }

    try {
      const response = await axios.post("http://local:3000/api/users.php", {
        userName,
        password,
        action:"login"
      });
     
      if (response.data.success) {
        toast.success("Login successful!");
        setUserId(response.data.id); // Set user ID
        sessionStorage.setItem("userId",response.data.id)
      } else {
        toast.error("Invalid user name or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer/>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-[#007fd5] text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* userName Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">User Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007fd5]"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              placeholder="Enter your user name"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007fd5] pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#007fd5] text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-4 text-sm">
          
        </div>
      </div>
    </div>
  );
};

export default Login;
