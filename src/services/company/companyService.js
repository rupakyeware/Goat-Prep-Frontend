import axios from "../../utils/axios.js";

export const getCompanyById = async(companyId) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company/${companyId}`);
    return res.data;
}

export const loadCompaniesForAsyncSearch = async(name) => {
    if(!name || name.trim() === "") return [];

    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company/search`, {params:{ name }});
        return res.data.map(c => ({
            value: c.companyId,
            label: c.companyName
        }));
    } catch(err) {
        console.log(err.message);
    }
}