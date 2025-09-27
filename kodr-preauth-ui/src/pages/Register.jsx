import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import Input from '../components/mini-component/Input';
import Button from '../components/mini-component/Button';

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/register", formData);

            // Check if login was successful
            if (response.data?.token) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setError("Login failed: Invalid response from server");
            }


        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded text-center text-sm">{error}</div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </form>

                <div className="flex items-center justify-center space-x-2">
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                    <span className="text-gray-500 text-sm">OR</span>
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>

                <button
                    onClick={handleGoogleSignUp}
                    className="flex items-center justify-center w-full py-2 space-x-2 border rounded-lg hover:bg-gray-100 transition duration-300"
                >
                    <img src="/google.png" alt="Google" className="w-6 h-6" />
                    <span className="text-gray-700">Continue with Google</span>
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={redirectToLogin}
                        className="text-blue-500 hover:underline font-medium cursor-pointer"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
