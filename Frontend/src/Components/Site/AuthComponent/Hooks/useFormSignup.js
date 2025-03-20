import { useState } from "react";
import { useMessage } from "../../../../Contexts/MessageContext";
import { signupUser } from "../../../../Apis/HandleUserApi.js";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../../Utils/Validation.js";

export const useFormSignup = () => {
  const { showToast } = useMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    crmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
      setErrorMessage({});

      setIsLoading(true);

      // ✅ Store the promise and handle the resolved data
      const signupPromise = signupUser(formData);

      showToast(signupPromise);

      signupPromise
        .then((res) => {
          setFormData({
            userName: "",
            email: "",
            password: "",
            crmPassword: "",
          });
          navigate("/sign-in");
        })
        .catch((error) => {
          console.error("Signup failed:", error);
        }).finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMessage({ ...errors, ...newErrors });
    }
  };


  return {
    formData,
    setFormData,
    showPassword,
    isLoading,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    errorMessage,
    handleInputChange,
    handleSubmit,
  };
};
