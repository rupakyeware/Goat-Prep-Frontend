import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth/authService";
import GoogleLogin from "../components/ui/common/GoogleLogin";
import PrimaryButton from "../components/ui/common/PrimaryButton";
import AuthErrorBox from "../components/ui/common/AuthErrorBox";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (password !== confirmPassword) throw new Error("Passwords do not match");
            const data = await registerUser(username, password); // get the jwt token on login
            login(data); // store the token in AuthContext and localStorage
            navigate("/");
        } catch (error) {
            if(error.response && error.response.status == 409) setError("Username already taken");
            else setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-h2">

            <form onSubmit={handleSubmit} className="p-4 rounded-md w-100 space-y-4">
                {error && <AuthErrorBox message={error}/>}
                <p className=" text-3xl text-md text-center text-normal font-bold">Sign up</p>
                <input type="text"
                    placeholder="Enter username"
                    className="w-full px-6 py-3 bg-gray rounded-md text-center"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder="Enter password"
                    className="w-full px-6 py-3 bg-gray rounded-md text-center"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type="password"
                    placeholder="Confirm password"
                    className="w-full px-6 py-3 bg-gray rounded-md text-center"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <PrimaryButton type="submit" disabled={loading}>Create Account</PrimaryButton>
                <GoogleLogin className="mt-4" />
                <p className="w-full text-center">Already have an account? <span className="text-yellow font-semibold"><a href="/login">Log in</a></span></p>
            </form>
        </div>
    )
}