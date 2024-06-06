import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const treeLogo = import.meta.env.PROD ? "treeImage.png" : "/treeImage.png";
  return (
    <nav className={styles.nav}>
      <ul>
        <a href="/treeImage.png">
          <img src={treeLogo} className={styles.logo} />{" "}
        </a>
      </ul>
      <ul>
        <li>
          <NavLink to="/map">Map</NavLink>
        </li>
      </ul>
    </nav>
  );
}
