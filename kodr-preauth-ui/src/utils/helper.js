import api from "./api";

export const loginUser = async (formData) => {
    const response = await api.post("/auth/login", {
        ...formData
    });

    return response.data;
};

// ------------------ REGISTER ------------------
export const registerUser = async (formData) => {
    const response = await api.post("/auth/register", formData);
    return response.data;
};

// ------------------ GOOGLE AUTH ------------------
export const googleAuth = async () => {
    
};
