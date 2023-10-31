import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../Assets/Css/admin/style.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <aside
        id="sidebar"
        className="sidebar"
        style={{
          width: isOpen ? "250px" : "70px",
          paddingLeft: isOpen ? "0px" : "0px",
        }}
      >
        {isOpen ? (
          <div>
            <span
              className="bars"
              style={{ paddingLeft: "221px", cursor: "pointer" }}
            >
              <i class="fas fa-sliders-h" onClick={toggle}></i>
            </span>

            <div style={{ padding: "10px" }}>
              <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                  <NavLink to="/admin">
                    <a className="nav-link" href="#">
                      <i className="fa-solid fa-grip"></i>{" "}
                      {/* Icon for Dashboard */}
                      {isOpen ? "Dashboard" : null}
                    </a>
                  </NavLink>
                </li>

                <li className="nav-heading">Form</li>

                <li className="nav-item">
                  <NavLink to="/form">
                    <a className="nav-link collapsed" href="#">
                      <i class="fa-solid fa-pen-to-square"></i>{" "}
                      {isOpen ? "Form" : null}
                    </a>
                  </NavLink>
                </li>

                <li className="nav-heading">Pages</li>

                <li className="nav-item">
                  <NavLink to="/member">
                    <a className="nav-link collapsed" href="#">
                      <i className="fa-solid fa-user"></i>{" "}
                      {isOpen ? "Member" : null}
                    </a>
                  </NavLink>
                </li>

                {/* <li className="nav-item">
                  <NavLink to="/amount">
                    <a className="nav-link collapsed" href="#">
                      <i className="fa-solid fa-money-bill-1"></i>{" "}
                      {isOpen ? "Amount" : null}
                    </a>
                  </NavLink>
                </li> */}

                {/* <li className="nav-item">
                  <NavLink to="/clan">
                    <a className="nav-link collapsed" href="#">
                      <i className="fa-brands fa-meetup"></i>{" "}
                      {isOpen ? "Clan" : null}
                    </a>
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            {/* for visiable icon in close position */}
            <div
              className="bars"
              style={{
                paddingLeft: "45px",
                cursor: "pointer",
                margin: "10px 0",
              }}
            >
              <i class="fas fa-sliders-h" onClick={toggle}></i>
            </div>

            <div style={{ padding: "5px" }}>
              <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item" style={{ margin: "5px" }}>
                  <NavLink to="/admin">
                    <a className="nav-link" href="#">
                      <i className="fa-solid fa-grip"></i>{" "}
                    </a>
                  </NavLink>
                </li>

                <li className="nav-item" style={{ margin: "5px" }}>
                  <NavLink to="/form">
                    <a className="nav-link collapsed" href="#">
                      <i class="fa-solid fa-pen-to-square"></i>{" "}
                    </a>
                  </NavLink>
                </li>

                <li className="nav-item" style={{ margin: "5px" }}>
                  <NavLink to="/member">
                    <a className="nav-link collapsed" href="#">
                      <i className="fa-solid fa-user"></i>{" "}
                    </a>
                  </NavLink>
                </li>

                {/* <li className="nav-item" style={{ margin: "5px" }}>
                  <NavLink to="/amount">
                    <a className="nav-link collapsed" href="#">
                      <i className="fa-solid fa-money-bill-1"></i>{" "}
                    </a>
                  </NavLink>
                </li> */}

                {/* <li className="nav-item" style={{ margin: "5px" }}>
                  <NavLink to="/clan">
                    <a className="nav-link collapsed" href="#">
                      <i className="fa-brands fa-meetup"></i>{" "}
                    </a>
                  </NavLink>
                </li> */}

                {/* Add similar code for other pages in the sidebar */}
              </ul>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
