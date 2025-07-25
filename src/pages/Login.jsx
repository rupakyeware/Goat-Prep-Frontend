import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth/authService";
import GoogleLogin from "../components/ui/common/GoogleLogin";

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
            if (error.response?.status === 401) setError("Invalid username or password");
            else setError("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-h2">
            <form onSubmit={handleSubmit} className="p-4 rounded-md w-80 space-y-4">
                <p className="text-3xl text-md text-center text-normal font-bold">Sign in</p>

                <input type="text"
                    placeholder="Username"
                    className="w-full px-6 py-3 bg-gray rounded-md text-center"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder="Password"
                    className="w-full px-6 py-3 bg-gray rounded-md text-center"
                    onChange={(e) => setPassword(e.target.value)}
                    requireds
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" className="w-full bg-primary text-black py-3 px-6 rounded-md text-center">Login</button>
                <GoogleLogin className="mt-4"/>
                <p className="w-full text-center">Don't have an account? <span className="text-yellow font-semibold"><a href="/register">Register</a></span></p>
            </form>
        </div>
    )
}