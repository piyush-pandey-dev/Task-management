// src/components/MainLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../../features/authSlice'

const MainLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-teal-700 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">T</span>
                            </div>
                            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
                                Task Manager
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-sm font-medium ring-1 ring-teal-600/20">
                                    {(user?.name || 'U').charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm text-slate-600">
                                    {user?.name || 'User'}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;