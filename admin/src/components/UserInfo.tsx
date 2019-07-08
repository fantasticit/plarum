import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { Menu, Dropdown, Avatar, message } from "antd";
import { connect } from "react-redux";
import { IState } from "../store";

const mapStateToProps = (state: IState) => ({
  currentUser: state.user.currentUser
});

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps;

const BaseComponent = (props: Props) => {
  const { t } = useTranslation();
  const { currentUser, history } = props;

  if (!currentUser) {
    message.info(t("tokenExpired"));
    history.replace("/login");
  }

  const menu = () => {
    return (
      <Menu>
        <Menu.Item>
          <NavLink to="/">{t("ownspace")}</NavLink>
        </Menu.Item>

        <Menu.Item>
          <NavLink to="/login">{t("logout")}</NavLink>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={menu}>
      <div
        style={{
          display: "inline-block",
          padding: "0 12px",
          cursor: "pointer"
        }}
      >
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          size={"small"}
          icon="user"
        />
        {currentUser ? (
          <span style={{ marginLeft: 8 }}>Hi, {currentUser.name}</span>
        ) : null}
      </div>
    </Dropdown>
  );
};

export const UserInfo = connect(
  mapStateToProps,
  null
)(withRouter(BaseComponent));
