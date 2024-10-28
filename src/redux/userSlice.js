import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

const initialState = {
  user: loadUserFromLocalStorage(),
  isLoggedIn: !!loadUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const user = action.payload;
      saveUserToLocalStorage(user);
      state.user = user;
      state.isLoggedIn = true;
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const storedUser = loadUserFromLocalStorage();

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        state.user = storedUser;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    },
    logoutUser: (state) => {
      removeUserFromLocalStorage();
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
