import { createAppSlice } from "../../redux/createAppSlice";
import { RootState } from "../../redux/store";

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
};

const initialState: UserSliceState = {
  user: undefined,
};
