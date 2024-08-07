import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://666035585425580055b2ca6c.mockapi.io/XeMay';

export const fetchMotorbikes = createAsyncThunk('motorbikes/fetchMotorbikes', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addMotorbike = createAsyncThunk('motorbikes/addMotorbike', async (motorbike) => {
    const response = await axios.post(API_URL, motorbike);
    return response.data;
});

export const updateMotorbike = createAsyncThunk('motorbikes/updateMotorbike', async (motorbike) => {
    const response = await axios.put(`${API_URL}/${motorbike.id}`, motorbike);
    return response.data;
});

export const deleteMotorbike = createAsyncThunk('motorbikes/deleteMotorbike', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const motorbikeSlice = createSlice({
    name: 'motorbikes',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMotorbikes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMotorbikes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchMotorbikes.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addMotorbike.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateMotorbike.fulfilled, (state, action) => {
                const index = state.list.findIndex((motorbike) => motorbike.id === action.payload.id);
                state.list[index] = action.payload;
            })
            .addCase(deleteMotorbike.fulfilled, (state, action) => {
                state.list = state.list.filter((motorbike) => motorbike.id !== action.payload);
            });
    },
});

export default motorbikeSlice.reducer;
