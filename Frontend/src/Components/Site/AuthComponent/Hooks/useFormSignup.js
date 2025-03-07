import { useState } from "react";
import { useMessage } from "../../../../Contexts/MessageContext";
import { validateForm } from "../../../../../Utils/Validation.js";
import { signupUser } from "../../../../../Apis/HandleUserApi.js";

export const useFormSignup = () => {
  const { showToast } = useMessage();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    crmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { ...errorMessage };

    if (formData.password !== formData.crmPassword) {
      newErrors.crmPassword = "Passwords do not match";
    } else {
      delete newErrors.crmPassword;
    }

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0 && !newErrors.crmPassword) {
      console.log(formData);
      setErrorMessage({});

      // ✅ Store the promise and handle the resolved data
      const signupPromise = signupUser(formData);

      showToast(signupPromise);

      signupPromise
        .then((res) => {
          console.log("User signed up successfully:", res);
          // Perform any additional actions like redirecting user
        })
        .catch((error) => {
          console.error("Signup failed:", error);
        });
    } else {
      setErrorMessage({ ...errors, ...newErrors });
    }
  };


  return {
    formData,
    setFormData,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    errorMessage,
    handleInputChange,
    handleSubmit,
  };
};
