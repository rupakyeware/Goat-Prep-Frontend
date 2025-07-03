import { useAuth } from "../context/AuthContext";

export default function TestAuth() {
  const { token, login, logout, isAuthenticated } = useAuth();

  return (
    <div className="p-4 text-white">
      <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
      <p className="break-all text-xs">Token: {token || "None"}</p>

      <div className="space-x-4 mt-4">
        <button
          className="bg-green-600 px-3 py-1 rounded"
          onClick={() => login("sample.jwt.token")}
        >
          Login
        </button>
        <button
          className="bg-red-600 px-3 py-1 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
