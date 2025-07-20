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

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/problems`, {params});
    return res.data;
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