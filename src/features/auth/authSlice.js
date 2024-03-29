import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  checkUser, fetchUser, signOut } from './authAPI';
import { updateUser } from './authAPI';
const initialState = {
  users:null,
  status: 'idle',
  error:null
};
export const fetchuserAsync = createAsyncThunk(
  'auth/fetchUser',
  async (userData) => {
    const response = await fetchUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } 
);

export const checkuserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginData) => {
    console.log(loginData)
    const response = await checkUser(loginData);
    // The value we return becomes the `fulfilled` action payload
    // console.log(response)
    return response.data;
  } 
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'userData',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchuserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
        state.getUser = action.payload;
      })
       .addCase(checkuserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkuserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(checkuserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      }) 
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = null;
      });

  },
})

export const { increment } = authSlice.actions;

export const selectUser = (state) => state.userData.users;

export const selectError = (state)=>state.userData.error;

export default authSlice.reducer;
