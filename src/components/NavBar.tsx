import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import treeLogo from "../assets/treeImage.png";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <a href="/">
          <img src={treeLogo} className={styles.logo} />{" "}
        </a>
      </ul>
      <ul>
        <li>
          <NavLink to="/">Simple API</NavLink>
        </li>
        <li>
          <NavLink to="/map">Map</NavLink>
        </li>
      </ul>
    </nav>
  );
}
