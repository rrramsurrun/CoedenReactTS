import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
import { logoutUser, selectUser } from "../features/users/userSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";

export default function NavBar() {
  const treeLogo = import.meta.env.PROD ? "treeImage.png" : "/treeImage.png";
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const navLink =
    user == null ? (
      <div className={styles.loginLinkContainer}>
        <NavLink className={styles.loginLink} to="/login">
          Login
        </NavLink>
      </div>
    ) : (
      <div>
        <div className={styles.loginLinkContainer}>
          <div className={styles.loginLink}>{user.username}</div>
        </div>
        <a className={styles.logoutLink} onClick={() => dispatch(logoutUser())}>
          Sign out
        </a>
      </div>
    );
  return (
    <div className={styles.nav}>
      <div className={styles.leftNav}>
        <div className={styles.treeLogoContainer}>
          <img src={treeLogo} className={styles.treeLogo} />
        </div>
        {navLink}
      </div>
      <nav className={styles.rightNav}>
        <ul>
          <li>
            <NavLink to="/map">Map</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
