import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask, resetTaskState } from '../features/taskSlice';
import FilterBar from '../components/FlterBar'
import TaskForm from '../components/TaskForm';

const statusStyles = {
    Completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    'In Progress': 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    Pending: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
};

const statusDot = {
    Completed: 'bg-emerald-500',
    'In Progress': 'bg-amber-500',
    Pending: 'bg-rose-500',
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        const timeoutId = setTimeout(() => {
            dispatch(getTasks({ search, status }));
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [dispatch, search, status]);

    useEffect(() => {
        return () => {
            dispatch(resetTaskState());
        };
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(id));
        }
    };

    const handleEdit = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setTaskToEdit(null);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <TaskForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                taskToEdit={taskToEdit}
            />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">My Tasks</h2>
                        <p className="text-sm text-slate-500 mt-1">Keep track of what needs doing.</p>
                    </div>
                    <button
                        className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-all"
                        onClick={handleAddNew}
                    >
                        + Add New Task
                    </button>
                </div>

                <FilterBar search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

                {isLoading ? (
                    <div className="text-center py-16 text-slate-400 text-sm">Loading tasks…</div>
                ) : tasks.length > 0 ? (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="text-left font-medium text-slate-500 text-xs uppercase tracking-wide px-5 py-3">Task</th>
                                        <th className="text-left font-medium text-slate-500 text-xs uppercase tracking-wide px-5 py-3">Status</th>
                                        <th className="text-left font-medium text-slate-500 text-xs uppercase tracking-wide px-5 py-3">Due Date</th>
                                        <th className="text-right font-medium text-slate-500 text-xs uppercase tracking-wide px-5 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {tasks.map((task) => (
                                        <tr key={task._id} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="px-5 py-4 max-w-sm">
                                                <p className="font-semibold text-slate-900 leading-snug">{task.title}</p>
                                                <p className="text-slate-500 text-sm mt-0.5 truncate">{task.description}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[task.status]}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[task.status]}`} />
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                                                {new Date(task.dueDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex justify-end gap-4">
                                                    <button
                                                        onClick={() => handleEdit(task)}
                                                        className="text-teal-700 hover:text-teal-900 font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(task._id)}
                                                        className="text-slate-400 hover:text-rose-600 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400 mt-6">
                        No tasks found. Create a new one!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;