import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    avatar: "",
    username: "",
    email: "",
    password: "",
    hobbies: [],
    gender: "",
    city: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        hobbies: checked
          ? [...prev.hobbies, value]
          : prev.hobbies.filter((hobby) => hobby !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg p-8 space-y-6 bg-bg rounded-2xl shadow-md border-color">
        <h1 className="text-3xl font-extrabold text-center lable-color">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="text-center">
            <label className="block text-sm font-medium lable-color">Avatar</label>
            <input type="file" className="mt-2 w-full border p-2 rounded-md border-color" />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium lable-color">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" className="w-full px-3 py-2 border-color rounded-md" required />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium lable-color">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-3 py-2 border-color rounded-md" required />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium lable-color">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full px-3 py-2 border-color rounded-md" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 text-sm font-secondary-color">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <label className="block text-sm font-medium lable-color">Hobbies</label>
            <div className="flex gap-4 mt-2">
              {["Reading", "Traveling", "Gaming", "Coding"].map((hobby) => (
                <label key={hobby} className="flex items-center gap-1">
                  <input type="checkbox" name="hobbies" value={hobby} checked={formData.hobbies.includes(hobby)} onChange={handleChange} className="border-color" />
                  {hobby}
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium lable-color">Gender</label>
            <div className="flex gap-4 mt-2">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center gap-1">
                  <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} className="border-color" />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium lable-color">City</label>
            <select name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border-color rounded-md">
              <option value="">Select City</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn py-2 rounded-lg">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;