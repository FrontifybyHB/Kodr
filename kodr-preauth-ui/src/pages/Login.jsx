import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import Input from '../components/mini-component/Input'
import Button from '../components/mini-component/Button'

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // window.location.reload();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // localStorage.setItem('token', response.data.token);

            if (response.data.user.role === 'admin') {
                navigate('/admin');
            }
            else {
                setFormData(formData.email = "")
                setFormData(formData.password = "")
                navigate('/dashboard');
            }

        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    const handleReload = () => {
    navigate('/register')
    window.location.reload();
  };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded text-center text-sm">{error}</div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
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

                    <Link
                        to="/forgot-password"
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Forgot password?
                    </Link>

                    <Button type="submit" fullWidth>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                {/* Divider */}
                <div className="flex items-center justify-center space-x-2">
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                    <span className="text-gray-500 text-sm">OR</span>
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full py-2 space-x-2 border rounded-lg hover:bg-gray-100 transition duration-300"
                >
                    <img src="./google.png" alt="Google" className="w-6 h-6" />
                    <span className="text-gray-700">Continue with Google</span>
                </button>


                <p className="text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link onClick={handleReload} className="text-blue-500 hover:underline font-medium">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
