import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAppSlice } from "../../redux/createAppSlice";
import { RootState } from "../../redux/store";
import { loginUser, loginUserWithToken, registerUser } from "./usersAPI";

export type User = {
  username: string;
  token: string;
};

export type UserLoginRequest = {
  username: string;
  password: string;
};

export type UserSliceState = {
  user: User | undefined;
  loginStatus: "LOGGED_OUT" | "LOGGING_IN" | "LOGGED_IN" | "LOGGING_OUT";
  loginError: string | "";
};

const initialState: UserSliceState = {
  user: undefined,
  loginStatus: "LOGGED_OUT",
  loginError: "",
};

export const userSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: (create) => ({
    registerUserAsync: create.asyncThunk(
      async (arg: { username: string; password: string }) => {
        const userDetails: UserLoginRequest = {
          username: arg.username,
          password: arg.password,
        };
        const registerResponse = await registerUser(userDetails);
        return registerResponse;
      },
      {
        pending: () => {
          console.log("Register pending");
        },
        fulfilled: () => {
          console.log("Register fulfilled");
        },
        rejected: () => {
          console.log("Register rejected");
        },
      }
    ),
    loginUserAsync: create.asyncThunk<
      User,
      UserLoginRequest,
      { rejectValue: string }
    >(
      async (userDetails: UserLoginRequest, thunkAPI): Promise<User> => {
        try {
          const loginResponse = await loginUser(userDetails);
          return loginResponse;
        } catch (e) {
          if (e instanceof Error) throw thunkAPI.rejectWithValue(e.message);
          throw thunkAPI.rejectWithValue("Unknown Error");
        }
      },
      {
        pending: (state) => {
          state.loginStatus = "LOGGING_IN";
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          localStorage.setItem("CoedenToken", action.payload.token);
          state.loginStatus = "LOGGED_IN";
        },
        rejected: (state, action) => {
          if (action.payload !== undefined) state.loginError = action.payload;
        },
      }
    ),
    loginWithToken: create.asyncThunk<User, string, { rejectValue: string }>(
      async (userToken: string, thunkAPI): Promise<User> => {
        try {
          const loginResponse = await loginUserWithToken(userToken);
          return loginResponse;
        } catch (e) {
          if (e instanceof Error) throw thunkAPI.rejectWithValue(e.message);
          throw thunkAPI.rejectWithValue("Unknown Error");
        }
      },
      {
        pending: (state) => {
          state.loginStatus = "LOGGING_IN";
        },
        fulfilled: (state, action) => {
          state.user = action.payload;
          localStorage.setItem("CoedenToken", action.payload.token);
          state.loginStatus = "LOGGED_IN";
        },
        rejected: () => {
          localStorage.removeItem("CoedenToken");
        },
      }
    ),
    logoutUser: create.reducer((state) => {
      state.user = undefined;
      state.loginStatus = "LOGGED_OUT";
      localStorage.removeItem("CoedenToken");
    }),
  }),
  selectors: {
    selectUser: (state) => state.user,
    selectLoginError: (state) => state.loginError,
  },
});

export const { registerUserAsync, loginUserAsync, loginWithToken, logoutUser } =
  userSlice.actions;
export const { selectUser, selectLoginError } = userSlice.selectors;
