import axios from "axios";

const axiosIntance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_USER,
    withCredentials: true,
});

export const signupUser = async (formData) => {
    const response = await axiosIntance.post("/sign-up", formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response?.data;
}


export const signInUser = async (formData) => {
    const response = await axiosIntance.post("/sign-in", formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return response?.data;
}

export const currentAuthData = async () => {
    const response = await axiosIntance.get("/current-user");
    return response?.data;
}

export default axiosIntance;