import {createAsyncThunk} from '@reduxjs/toolkit';
import {addTodo} from '../reducers/todoReducer';
const api_url = 'https://6669bdd32e964a6dfed6709e.mockapi.io/redux';
export const fetchTodos = () => {
  return async dispatch => {
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      data.forEach(row => {
        dispatch(addTodo(row));
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
};
export const deleteTodoApi = createAsyncThunk(
  'todo/deleteTodoApi',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${api_url}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return id;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const addTodoAPI = createAsyncThunk(
  'todo/addTodoAPI',
  async (objTodo, thunkAPI) => {
    console.log(objTodo);
    try {
      const response = await fetch(api_url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objTodo),
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTodoApi = createAsyncThunk(
  'todo/updateTodoApi',
  async (objUpdate, thunkAPI) => {
    try {
      const response = await fetch(`${api_url}/${objUpdate.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objUpdate.data),
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
