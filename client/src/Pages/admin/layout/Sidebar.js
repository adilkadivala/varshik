import React from "react";
import { NavLink } from "react-router-dom";
import "../../../Assets/Css/admin/style.css";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              
              <NavLink to="/admin">
              <i className="fa-solid fa-grip"></i>
                DashBoard
              </NavLink>

            </a>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          
          <li className="nav-heading">Pages</li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <NavLink to="/member">
                <i className="fa-solid fa-user"></i>
                Add Member
              </NavLink>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <NavLink to="/amount">
                <i className="fa-solid fa-money-bill-1"></i>
                Add Amount
              </NavLink>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <NavLink to="/clan">
                <i className="fa-brands fa-meetup"></i>
                Add Clan
              </NavLink>
            </a>
          </li>
          
          {/* <!-- End Profile Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
