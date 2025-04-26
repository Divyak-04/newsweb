import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider, signInWithPopup } from "../config/firebaseconfig";
import { FaGoogle } from "react-icons/fa";

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white shadow-2xl rounded-2xl flex max-w-4xl w-full">
                {/* Left Panel */}
                <div className="w-1/2 bg-gradient-to-tr from-blue-500 to-purple-600 text-white p-10 rounded-l-2xl flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-lg">Login to access your dashboard and explore more features.</p>
                </div>

                {/* Right Panel - Login Form */}
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-5 text-center text-gray-500">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-3 transition duration-300"
                    >
                        <FaGoogle className="w-5 h-5" />
                        <span>Sign in with Google</span>
                    </button>

                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline font-medium">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
