import { User, UserLoginRequest } from "./userSlice";
const baseURL = import.meta.env.PROD
  ? "https://ramsurrun-portfolio.com"
  : "https://localhost:8001";

export async function registerUser(
  userLoginRequest: UserLoginRequest
): Promise<User> {
  const registerResponse = await fetch(`${baseURL}/coedenRegister`, {
    method: "POST",
    body: JSON.stringify(userLoginRequest),
  });
  return registerResponse.json();
}

export async function loginUser(
  userLoginRequest: UserLoginRequest
): Promise<User> {
  const registerResponse = await fetch(`${baseURL}/coedenLogin`, {
    method: "POST",
    body: JSON.stringify(userLoginRequest),
  });
  return registerResponse.json();
}
