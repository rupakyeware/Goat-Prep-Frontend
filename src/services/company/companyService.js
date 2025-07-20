import axios from "../../utils/axios.js";

export const getCompanyById = async(companyId) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company/${companyId}`);
    return res.data;
}

export const loadCompaniesForAsyncSearch = async(name) => {
    if(!name || name.trim() === "") return [];

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company`, {params:{ name }});
    console.log(res);
    return res.data.map(c => ({
        value: c.companyId,
        label: c.companyName
    }));
}