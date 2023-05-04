import api from "./mainService";

const baseURL = "http://localhost:8080"

export const loginAPI = async (data) => {
    const res = await api.post(`${baseURL}/user`, data, { withCredentials: true });

    return res;
};



export const registerAPI = async (data) => {
    const res = await api.post("http://localhost:8080/register", data, { withCredentials: true });

    return res.data;
};
