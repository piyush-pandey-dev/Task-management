import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskService } from '../services/taskService';

const initialState = {
    tasks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get Tasks Thunk (With Search & Status params)
export const getTasks = createAsyncThunk('tasks/getAll', async ({ search, status }, thunkAPI) => {
    try {
        return await taskService.getTasks(search, status);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Create Task Thunk
export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
    try {
        return await taskService.createTask(taskData);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Update Task Thunk
export const updateTask = createAsyncThunk('tasks/update', async ({ id, taskData }, thunkAPI) => {
    try {
        return await taskService.updateTask(id, taskData);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete Task Thunk
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
    try {
        return await taskService.deleteTask(id);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        resetTaskState: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Tasks
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks = action.payload.tasks;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Create Task
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tasks.push(action.payload.task); // Naya task list me add kar diya
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Update Task
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Purane task ko naye updated task se replace kar diya
                state.tasks = state.tasks.map((task) => 
                    task._id === action.payload.task._id ? action.payload.task : task
                );
            })
            // Delete Task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Delete hue task ko list se filter out kar diya
                // Dhyan de: action.meta.arg se hume wo ID milti hai jo humne delete karne ke liye bheji thi
                state.tasks = state.tasks.filter((task) => task._id !== action.meta.arg);
            });
    }
});

export const { resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;