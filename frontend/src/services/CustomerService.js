import api from "./mainService";

const baseURL = "http://localhost:8080"

export const registerCustomerAPI = async (data,setUploadProgress) => {
    setUploadProgress(0)
    const res = await api.post(`${baseURL}/registerCustomer`, data, { withCredentials: true ,  onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
        console.log(setUploadProgress)
        
     
      }});
    return res;
};

export const getCustomerList = async () => {
    const res = await api.get(`${baseURL}/getCustomersList`, { withCredentials: true });
    return res;
};

export const validateAPI = async (data) => {
    const res = await api.post(`${baseURL}/validateCustomer`, data, { withCredentials: true });
    return res;
};

export const addCustomer = async (newRow) => {
    const res = await api.post(`${baseURL}/addCustomer`, newRow, { withCredentials: true });
    return res;
};

export const updateCustomer = async (newRow) => {
    const res = await api.post(`${baseURL}/updateCustomer`, newRow, { withCredentials: true });;
    return res;
};

export const deleteCustomer = async (selectedRow) => {
    const res = await api.get(`${baseURL}/deleteCustomer?email=${selectedRow.email}`, { withCredentials: true });;
    return res;
};


