import { removeToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";
import { loginAPI, verifyTokenAPI, getProfileAPI } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  //state
  initialState: {
    // assign value to token by checking localstorage first
    token: getToken() || "",
    // using redux to main user infomraiton
    userInfo: {},
  },
  // sync method
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //store it into localstorage
      //localStorage.setItem("token_key", action.payload);
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },

    clearUserInfo(state, action) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

// destructure actionCreater

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// get reducer function
const userReducer = userStore.reducer;

// Async function to handle login
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      const res = await loginAPI(loginForm);
      if (res.code === "200") {
        dispatch(setToken(res.data.token));
        dispatch(setUserInfo(res.data));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };
};

// Async function to get user info
const fetchUserInfo = () => {
  return async (dispatch) => {
    try {
      const res = await getProfileAPI();
      dispatch(setUserInfo(res.data));
    } catch (error) {
      console.error("Fetching user info failed:", error);
    }
  };
};

// Async function to verify token
const verifyToken = () => {
  return async (dispatch) => {
    try {
      const res = await verifyTokenAPI();
      if (res.code === "200") {
        return true;
      } else {
        dispatch(clearUserInfo()); // Clear Redux state when the token is invalid
        return false;
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      dispatch(clearUserInfo()); // Handle errors by clearing user state
      return false;
    }
  };
};

export { fetchUserInfo, fetchLogin, verifyToken, clearUserInfo };

export default userReducer;
