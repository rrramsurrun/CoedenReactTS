import React, { useEffect, useRef } from "react";
import styles from "./LoginRegisterPage.module.css";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import {
  registerUserAsync,
  loginUserAsync,
  selectLoginError,
} from "../features/users/userSlice";
import { useSelector } from "react-redux";

export default function LoginRegisterPage(props: { register: boolean }) {
  const { register } = props;
  const dispatch = useAppDispatch();
  const error = useSelector(selectLoginError);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submitText = register ? "Register" : "Login";
  const redirectText = register
    ? "Already registered? Sign in here"
    : "Not registered? Create an account here";
  const redirectLink = register ? "/login" : "/register";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.current !== null && password.current !== null) {
      if (register) {
        dispatch(
          registerUserAsync({
            username: username.current.value,
            password: password.current.value,
          })
        );
      } else {
        dispatch(
          loginUserAsync({
            username: username.current.value,
            password: password.current.value,
          })
        );
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
      <div>
        <h2>Login</h2>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username:
          </label>
          <input
            required={true}
            className={styles.input}
            id="username"
            type="text"
            ref={username}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            required={true}
            className={styles.input}
            id="password"
            type="password"
            ref={password}
          />
        </div>
        {error === "" ? null : <div className={styles.error}>{error}</div>}

        <div>
          <button>{submitText}</button>
        </div>
        <NavLink className={styles.redirectLink} to={redirectLink}>
          {redirectText}
        </NavLink>
      </div>
      <div className={styles.accountBenefits}>
        <h3>With an account you can:</h3>
        <ul>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium
          </li>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium
          </li>
          <li>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium
          </li>
        </ul>
      </div>
    </form>
  );
}
