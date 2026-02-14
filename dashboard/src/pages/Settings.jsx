import { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";


const Settings = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
console.log(userId)
  // Function to update username
  // const handleUsernameChange = async (e) => {
  //   e.preventDefault();

  //   if (username.trim() === "") {
  //     toast.error("Username cannot be empty.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("http://local:3000/api/users.php", {
  //       action: "username",
  //       id: userId,
  //       userName: username,
  //     });
      
  //     if (response.data.success) {
  //       toast.success("Username updated successfully!");
  //     } else {
  //       toast.error("Failed to update username.");
  //     }
  //   } catch (error) {
  //     console.error("Username Update Error:", error);
  //     toast.error("An error occurred while updating username.");
  //   }
  // };

  // Function to update password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match.");
    //   return;
    // }

    try {
      const response = await axios.post("http://localhost:3000/login.php", {
        action: "change_password",
      email: email,
        old_password: password,
        new_password: confirmPassword,
      });
console.log(response)
      if (response.status==200) {
        toast.success("Password changed successfully!");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      console.error("Password Change Error:", error);
      toast.error("An error occurred while changing password.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <ToastContainer/>
      <h2 className="text-2xl font-semibold text-[#007fd5] mb-6">Settings</h2>

      {/* Change Username Form */}
      <form  className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Username</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007fd5]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <button
          type="submit"
          className="mt-3 bg-[#007fd5] text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Update Username
        </button> */}
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange}>
        <label className="block text-gray-700 font-medium mb-2">
          Old Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007fd5]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mt-4 mb-2">
          New Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007fd5]"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-3 bg-[#007fd5] text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Settings;
