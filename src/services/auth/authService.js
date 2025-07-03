import axios from "../../utils/axios.js";

export const loginUser = async(username, password) => {
    const res = await axios.post("/public/auth/login",{username, password});
    return res.data;
}

export const registerUser = async(username, password) => {
    const res = await axios.post("/public/auth/register", {username, password});
    return res.data;
}