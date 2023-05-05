import api from "./mainService";

const baseURL = "http://localhost:8080"

const email1="j@n.com"

export const getCustomersListForAgent = async () => {
    const res = await api.get(`${baseURL}/getCustomersListForAgent/${email1}`, { withCredentials: true })
    return res;
};

export const getListOfCutomerForReview = async () => {
    const res = await api.get(`${baseURL}/getListOfCutomerForReview`, { withCredentials: true })
    return res;
};

