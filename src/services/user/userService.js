import axios from "../../utils/axios.js";

export const getSolvedProblems = async() => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/problems`);
    return res.data;
}

export const handleProblemSolved = async(problemId) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/problems/${problemId}/solved`);
    return res.data;
}