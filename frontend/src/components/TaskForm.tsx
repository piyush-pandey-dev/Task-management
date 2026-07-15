import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../features/taskSlice';

const TaskForm = ({ isOpen, onClose, taskToEdit }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.tasks);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        dueDate: '',
    });

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                status: taskToEdit.status,
                dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '',
            });
        } else {
            setFormData({
                title: '',
                description: '',
                status: 'Pending',
                dueDate: '',
            });
        }
    }, [taskToEdit, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskToEdit) {
            dispatch(updateTask({ id: taskToEdit._id, taskData: formData }));
        } else {
            dispatch(createTask(formData));
        }

        onClose();
    };

    if (!isOpen) return null;

    const inputClasses = "mt-1.5 block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-colors";
    const labelClasses = "block text-xs font-medium text-slate-500 uppercase tracking-wide";

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h2 className="text-lg font-semibold mb-5 text-slate-900">
                    {taskToEdit ? 'Edit Task' : 'Create New Task'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={labelClasses}>Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Description</label>
                        <textarea
                            name="description"
                            required
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            required
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={inputClasses}
                        />
                    </div>

                    {taskToEdit && (
                        <div>
                            <label className={labelClasses}>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`${inputClasses} bg-white`}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? 'Saving...' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;