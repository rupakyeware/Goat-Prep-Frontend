import axios from "../../utils/axios.js";

export const getCompanyById = async(companyId) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company/${companyId}`);
    return res.data;
}