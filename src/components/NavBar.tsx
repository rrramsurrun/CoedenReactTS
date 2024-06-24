import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const treeLogo = import.meta.env.PROD ? "treeImage.png" : "/treeImage.png";
  return (
    <div className={styles.nav}>
      <div className={styles.leftNav}>
        <div className={styles.treeLogoContainer}>
          <img src={treeLogo} className={styles.treeLogo} />{" "}
        </div>
        <div className={styles.loginLinkContainer}>
          <NavLink className={styles.loginLink} to="/login">
            Login
          </NavLink>
        </div>
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
