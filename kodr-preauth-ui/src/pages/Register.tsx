import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Input from '../components/mini-component/Input';
import Button from '../components/mini-component/Button';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if user is already logged in
    useState(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard');
            }
        });
        return () => unsubscribe();
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await doCreateUserWithEmailAndPassword(email, password);
            // User will be redirected automatically by auth state change
            navigate('/dashboard');
        } catch (err) {
            setLoading(false);
            // Handle Firebase auth errors
            const errorCode = err.code;
            let message = "Failed to create account. Please try again.";

            if (errorCode === 'auth/email-already-in-use') {
                message = "An account with this email already exists.";
            } else if (errorCode === 'auth/invalid-email') {
                message = "Invalid email address.";
            } else if (errorCode === 'auth/weak-password') {
                message = "Password is too weak. Please use a stronger password.";
            } else if (errorCode === 'auth/operation-not-allowed') {
                message = "Email/password accounts are not enabled.";
            }

            setError(message);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        setError("");

        try {
            await doSignInWithGoogle();
            // User will be redirected automatically by auth state change
            navigate('/dashboard');
        } catch (err) {
            setLoading(false);
            const errorCode = err.code;
            let message = "Failed to sign in with Google.";

            if (errorCode === 'auth/popup-closed-by-user') {
                message = "Sign-in popup was closed.";
            } else if (errorCode === 'auth/cancelled-popup-request') {
                message = "Sign-in was cancelled.";
            }

            setError(message);
        }
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
                        label="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password (min 8 characters)"
                        required
                    />
                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                    />
                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
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
