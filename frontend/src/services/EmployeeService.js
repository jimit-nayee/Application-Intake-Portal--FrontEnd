import api from "./mainService";

const baseURL = "http://localhost:8080"

export const getAllEmployees = async () => {
    const res = await api.get(`${baseURL}/getAllEmployees`, { withCredentials: true });
    return res;
};

export const deleteEmployee = async (selectedRow) => {
    const res = await api.post(`${baseURL}/delete`, selectedRow, { withCredentials: true });
    return res;
};
