import React, { useEffect, useState, useCallback } from "react";
import { useUserData } from "../../Contexts/UserContext";

const Profile = () => {
  const { user } = useUserData();
  const [formData, setFormData] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      const updatedData = Object.entries(user).reduce((acc, [key, value]) => {
        acc[key] = value === null ? (key === "hobby" ? [] : "") : value;
        return acc;
      }, {});

      setFormData(updatedData);
    }
  }, [user]);


  const handleChange = useCallback((e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files.length > 0) {
        const file = files[0];
        if (file.size >= 200000) {
          console.log("File too large");
          return;
        }
        setFormData((prev) => ({ ...prev, avatar: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        hobby: prev.hobby.includes(value)
          ? prev.hobby.filter((h) => h !== value)
          : [...prev.hobby, value],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const sanitizedData = {
    //   ...formData,
    //   hobby: formData.hobby.length ? formData.hobby : "None",
    //   city: formData.city || "Not Provided",
    //   gender: formData.gender || "Not Specified",
    // };

    console.table(formData);
  };


  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg p-8 space-y-6 bg-bg rounded-2xl shadow-md border-color">
        <h1 className="text-3xl font-extrabold text-center lable-color">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          {/* Avatar Upload */}
          <div className="text-center">
            <label className="block text-sm font-medium lable-color">Avatar</label>
            <input type="file" name="avatar" onChange={handleChange} className="mt-2 w-full border p-2 rounded-md border-color" accept="image/png, image/jpeg" />
            <img src="" alt="" />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium lable-color">Username</label>
            <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Enter your username" className="w-full px-3 py-2 border-color rounded-md" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium lable-color">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-3 py-2 border-color rounded-md" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium lable-color">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full px-3 py-2 border-color rounded-md" />
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
                  <input type="checkbox" name="hobbies" value={hobby} onChange={handleChange} className="border-color" />
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
                  <input type="radio" name="gender" value={gender} onChange={handleChange} className="border-color" />
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