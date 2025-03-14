import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider, signInWithPopup } from "../config/firebaseconfig"; // Import Firebase config
import { FaGoogle } from "react-icons/fa"; // Import Google Icon

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            alert(`Welcome, ${res.data.userName}`);
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Login Failed");
        }
    };

    // Google Sign-In Function
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            alert(`Welcome, ${user.displayName}`);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setError("Google Sign-In failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Added Space Between Buttons */}
                <div className="my-4 text-center text-gray-500">or</div>

                {/* Google Sign-In Button */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
                >
                    <FaGoogle className="w-5 h-5" />
                    <span>Sign in with Google</span>
                </button>

                <p className="text-center text-gray-600 mt-6">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
