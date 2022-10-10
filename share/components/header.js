import Link from "next/link";
import React, { useEffect } from "react";
import { useCookies, removeCookie } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../redux/authSlice";

const Header = () => {
  const [cookies, removeCookie] = useCookies(["accessToken", "userId"]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (cookies.accessToken != 'undefined' && cookies.accessToken != null) {
      dispatch(setLogin(cookies.accessToken));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("proses logout");
    dispatch(setLogout());
    removeCookie(["accessToken"]);
    removeCookie(["userId"]);
    removeCookie(["email"]);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/blogs">
            <a className="nav-link">Blogs</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/users">
            <a className="nav-link">Users</a>
          </Link>
        </li>
        {
          !auth.isLoggedIn ?
          <li className="nav-item">
          <Link href="/login">
            <a className="nav-link">Login</a>
          </Link>
        </li> : <li
          className="nav-item"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <a className="nav-link">Logout</a>
        </li>
        }
      </ul>
    </nav>
  );
};

export default Header;
