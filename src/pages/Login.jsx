import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth/authService";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(username, password); // get the jwt token on login
            login(data); // store the token in AuthContext and localStorage
            navigate("/");
        } catch (error) {
            if(error.response?.status === 401) setError("Invalid username or password");
            else setError("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-start font-h2">
            <form onSubmit={handleSubmit} className="p-4 rounded-md w-80 space-y-4">
                <h1 className="text-md text-left text-h1 font-bold">Sign In</h1>
                <input type="text"
                    placeholder="enter username"
                    className="w-full px-6 py-3 bg-input rounded-md"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder="enter password"
                    className="w-full px-6 py-3 bg-input rounded-md"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" className="w-full bg-primary text-black py-3 px-6 rounded-md font-">Login</button>
            </form>
        </div>
    )
}