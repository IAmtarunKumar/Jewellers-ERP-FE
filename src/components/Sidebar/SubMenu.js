import React, { useState } from "react";
import { Collapse, NavItem, NavLink } from "reactstrap";
import classNames from "classnames";
import { NavLink as NavLinkRRD } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  // console.log(props);
  const { icon, title, items, darkTheme, onClick } = props;

  return (
    <>
      <NavItem
        onClick={toggle}
        className={classNames({ "menu-open": !collapsed })}
      >
        <NavLink
          className={`${
            darkTheme ? "dark-theme" : "light-theme"
          } dropdown-toggle `}
          style={{ cursor: "pointer" }}
        >
          <i className={icon} />
          {title}
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!collapsed}
        // navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
        {items.map((item, index) => (
          <NavItem key={index} className=" pl-4">
            <NavLink
              to={item.layout + item.path}
              tag={NavLinkRRD}
              onClick={onClick}
              className={`${darkTheme ? "dark-theme" : "light-theme"} `}
            >
              <i className={item.icon} />
              {item?.name}
            </NavLink>
          </NavItem>
        ))}
      </Collapse>
    </>
  );
};

export default SubMenu;
