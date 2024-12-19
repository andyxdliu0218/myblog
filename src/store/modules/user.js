import { req } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";

const tokenUrl = "";
const userStore = createSlice({
  name: "user",
  //state
  initialState: {
    // assign value to token by checking localstorage first
    token: getToken() ? getToken() : "",
  },
  // sync method
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      //store it into localstorage
      //localStorage.setItem("token_key", action.payload);
      _setToken(action.payload);
    },
  },
});

// destructure actionCreater

const { setToken } = userStore.actions;

// get reducer function
const userReducer = userStore.reducer;

// async method to retrieve token

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. request for token
    const res = await req({
      method: "post",
      url: tokenUrl,
      data: loginForm,
    });

    // 2. store token
    dispatch(setToken(res.data.token));
  };
};

export { setToken, fetchLogin };

export default userReducer;
