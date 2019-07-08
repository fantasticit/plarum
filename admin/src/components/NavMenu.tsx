import React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Menu, Icon } from "antd";
import { useTranslation } from "react-i18next";
import { routes } from "../router";

type Props = {
  layoutMode: string;
  theme: "light" | "dark" | undefined;
};

const BaseComponent: React.FC<Props & RouteComponentProps> = props => {
  const { t } = useTranslation();
  const { layoutMode, theme, history } = props;
  const pathname = history.location.pathname;

  return (
    <Menu
      theme={theme}
      mode={layoutMode !== "sider" ? "horizontal" : "inline"}
      defaultSelectedKeys={[pathname]}
      selectedKeys={[pathname]}
      style={
        layoutMode === "sider" ? {} : { overflowX: "auto", overflowY: "hidden" }
      }
    >
      {routes.slice(2).map(route => {
        if (route.children) {
          return (
            <Menu.SubMenu
              key={route.title}
              title={
                <span>
                  <Icon type={route.icon} />
                  <span>{t(route.title)}</span>
                </span>
              }
            >
              {route.children.map(subRoute =>
                subRoute.path ? (
                  <Menu.Item key={subRoute.path}>
                    <NavLink to={subRoute.path}>
                      <Icon type={subRoute.icon} />
                      <span>{t(subRoute.title)}</span>
                    </NavLink>
                  </Menu.Item>
                ) : null
              )}
            </Menu.SubMenu>
          );
        } else {
          return route.path ? (
            <Menu.Item key={route.path || route.title}>
              <NavLink to={route.path}>
                <Icon type={route.icon} />
                <span>{t(route.title)}</span>
              </NavLink>
            </Menu.Item>
          ) : null;
        }
      })}
    </Menu>
  );
};

export const NavMenu: React.ComponentType<Props> = withRouter(BaseComponent);
