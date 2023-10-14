import React from "react";
import { NavLink } from "react-router-dom";
import "../../../Assets/Css/admin/style.css";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink to="/admin">
              <a className="nav-link" href="#">
                <i className="fa-solid fa-grip"></i>
                DashBoard
              </a>
            </NavLink>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-heading">Pages</li>

          <li className="nav-item">
            <NavLink to="/member">
              <a className="nav-link collapsed" href="#">
                <i className="fa-solid fa-user"></i>
                Add Member
              </a>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/amount">
              <a className="nav-link collapsed" href="#">
                <i className="fa-solid fa-money-bill-1"></i>
                Add Amount
              </a>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/clan">
              <a className="nav-link collapsed" href="#">
                <i className="fa-brands fa-meetup"></i>
                Add Clan
              </a>
            </NavLink>
          </li>

          {/* <!-- End Profile Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
