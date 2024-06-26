import { User, UserLoginRequest } from "./userSlice";
const baseURL = import.meta.env.PROD
  ? "https://ramsurrun-portfolio.com"
  : "https://localhost:8001";

export async function registerUser(
  userRegisterRequest: UserLoginRequest
): Promise<string> {
  const registerResponse = await fetch(`${baseURL}/coedenRegister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRegisterRequest),
  });
  return registerResponse.json();
}

export async function loginUser(
  userLoginRequest: UserLoginRequest
): Promise<User> {
  const loginResponse = await fetch(`${baseURL}/coedenLogin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLoginRequest),
  });

  if (loginResponse.ok) return loginResponse.json();
  if (loginResponse.status === 400) {
    const body = await loginResponse.json();
    if (body.title === "One or more validation errors occurred.") {
      throw new Error(getValidationErrorMessages(body));
    }
  }
  if (loginResponse.status === 401) {
    throw new Error(await loginResponse.text());
  }

  throw new Error(
    `Unexpected error: ${loginResponse.status} ${loginResponse.statusText}`
  );
}

export async function loginUserWithToken(userToken: string): Promise<User> {
  const loginResponse = await fetch(`${baseURL}/coedenLoginToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    },
    credentials: `include`,
  });

  if (loginResponse.ok) return loginResponse.json();
  if (loginResponse.status === 401) {
    throw new Error("Invalid JWT");
  }
  throw new Error(
    `Unexpected error: ${loginResponse.status} ${loginResponse.statusText}`
  );
}

type ValidationErrorDetail = {
  [field: string]: string[];
};

type ValidationErrorResponse = {
  type: string;
  title: string;
  status: number;
  errors: ValidationErrorDetail;
  traceId: string;
};

function getValidationErrorMessages(
  errorResponse: ValidationErrorResponse
): string {
  const errorMessages: string[] = [];
  for (const field in errorResponse.errors) {
    if (errorResponse.errors.hasOwnProperty(field)) {
      const fieldErrors = errorResponse.errors[field];
      errorMessages.push(...fieldErrors);
    }
  }
  return errorMessages.join(" ");
}
