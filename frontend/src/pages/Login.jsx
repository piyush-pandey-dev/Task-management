import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../features/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, token, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {

        if (isSuccess || token) {
            navigate('/');
        }

        if (isError) {
            alert(message);
        }

        dispatch(reset());
    }, [user, token, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        dispatch(loginUser(userData));
    };

    const inputClasses = "mt-1.5 block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors";
    const labelClasses = "block text-xs font-medium text-slate-500 uppercase tracking-wide";

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Welcome back
                    </h2>
                    <p className="text-sm text-slate-500 mt-1.5">
                        Sign in to pick up where you left off.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className={labelClasses}>Email address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 transition-colors mt-2"
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-teal-700 hover:text-teal-900">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;