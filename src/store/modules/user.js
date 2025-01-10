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

// async method to retrieve token

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. request for token
    const res = await loginAPI(loginForm);
    // console.log(res);
    if (res.code === "200") {
      // 2. store token
      dispatch(setToken(res.data.token));
      return true;
    } else {
      return false;
    }
  };
};

// aysnc method to get user information
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI();

    dispatch(setUserInfo(res.data));
  };
};

const verifyToken = () => {
  return async () => {
    const res = await verifyTokenAPI();
    if (res.code === "200") {
      return true;
    } else {
      removeToken();
      return false;
    }
  };
};

export { fetchUserInfo, fetchLogin, verifyToken, clearUserInfo };

export default userReducer;
