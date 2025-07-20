import axios from "../../utils/axios.js";

export const postExperience = async(experience) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/company/experience`, experience);
    return res.data;
}