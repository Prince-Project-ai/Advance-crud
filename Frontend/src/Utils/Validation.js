export const validateForm = (formData) => {
  let errors = {};

  if (!formData.userName.trim()) {
    errors.userName = "Username is required";
  } else if (formData.userName.length < 5) {
    errors.userName = "Username must be at least 5 characters";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password.trim()) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }



  return errors;
};
