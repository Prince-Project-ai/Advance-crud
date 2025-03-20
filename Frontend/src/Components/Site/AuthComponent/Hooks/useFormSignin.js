import { useState } from "react";
import { signInUser } from "../../../../../Apis/HandleUserApi";
import { useMessage } from "../../../../Contexts/MessageContext";
import { useUserData } from "../../../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const useFormSignin = () => {
  const { showToast } = useMessage();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userNameEmail: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.userNameEmail.trim()) {
      errors.userNameEmail = 'username or email is required';
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
      setFormError({});

      setIsLoading(true);
      const signInPromise = signInUser(formData);

      showToast(signInPromise);

      signInPromise.then((res) => {
        setFormData({
          userNameEmail: "",
          password: ""
        });
        setIsAuthenticated(res?.success);
        setUser(res?.data?.loggedUser);
        navigate("/");
      }).catch((err) => {
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setFormError(errors);
    }
    // Here you would typically handle authentication logic
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    formError,
    isLoading,
  };
}
