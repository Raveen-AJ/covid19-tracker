import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className={classes.header}>
      <div id="logo">
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="nav-active" exact>
              Map
            </NavLink>
          </li>

          <li>
            <NavLink to="/chart" activeClassName="nav-active" exact>
              Charts
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
