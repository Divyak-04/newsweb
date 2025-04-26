import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await axios.post("http://localhost:5000/api/auth/register", formData);
            setSuccess("Registration successful! Redirecting to login...");
            setFormData({ name: "", email: "", password: "" });
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white shadow-2xl rounded-2xl flex max-w-4xl w-full">
                {/* Left Panel */}
                <div className="w-1/2 bg-gradient-to-tr from-blue-500 to-purple-600 text-white p-10 rounded-l-2xl flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
                    <p className="text-lg">Create your account and start your journey with us.</p>
                </div>

                {/* Right Panel - Register Form */}
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
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
                            Register
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-6">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
