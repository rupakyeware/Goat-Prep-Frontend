import axios from "../../utils/axios.js";

export const getFilteredProblems = async({
    difficulty, 
    minLookups, 
    sortBy, 
    order, 
    page
} = {}) => {
    const params = {};
    if(difficulty !== undefined) params.difficulty = difficulty;
    if(minLookups !== undefined) params.minLookups = minLookups;
    params.sortBy = sortBy;
    params.order = order;
    params.page = page;

    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems`, {params});
        return res.data;
    } catch(error) {
        console.log("Server returned error: " + error.message);
    }
}

export const getProblemsByName = async({
    // difficulty, 
    // minLookups, 
    // sortBy, 
    // order, 
    // page,
    name
} = {}) => {
    const params = {};
    if(name !== undefined) params.name = name;
    // if(difficulty !== undefined) params.difficulty = difficulty;
    // if(minLookups !== undefined) params.minLookups = minLookups;
    // params.sortBy = sortBy;
    // params.order = order;
    // params.page = page;

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/search`, {params});
    return res.data;
}

export const getProblemsByCompanyId = async({
    difficulty, 
    minLookups, 
    sortBy, 
    order, 
    page,
    companyId
} = {}) => {
    const params = {};
    if(difficulty !== undefined) params.difficulty = difficulty;
    if(minLookups !== undefined) params.minLookups = minLookups;
    params.sortBy = sortBy;
    params.order = order;
    params.page = page;
    params.companyId = companyId;

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company/problems`, {params});
    return res.data;
}

export const loadProblemsForAsyncSearch = async(name) => {
    if(!name) return [];
    const params = {};
    params.name = name;

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems/search`, {params: { name }});
    return res.data.map(p => ({
        value: p.problemId,
        label: p.problemName
    }));
}