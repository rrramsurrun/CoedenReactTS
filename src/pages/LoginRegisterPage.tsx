import { useRef } from "react";
import styles from "./LoginRegisterPage.module.css";
import { NavLink } from "react-router-dom";

export default function LoginRegisterPage(props: { register: boolean }) {
  const { register } = props;
  const username = useRef<string | undefined>(undefined);
  const password = useRef<string | undefined>(undefined);

  const submitText = register ? "Register" : "Login";
  const redirectText = register
    ? "Already registered? Sign in here"
    : "Not registered? Create an account here";
  const redirectLink = register ? "/login" : "/register";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Fake submission");
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
            className={styles.input}
            id="username"
            type="text"
            value={username.current}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            value={password.current}
          />
        </div>
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
