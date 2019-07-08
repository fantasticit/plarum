import React, { useState } from "react";
import { Row, Col, Layout, Icon } from "antd";
import classnames from "classnames";
import { Logo } from "../components/Logo";
import { SelectLang } from "../components/SelectLang";
import { UserInfo } from "../components/UserInfo";
import { DefaultFooter } from "../components/DefaultFooter";
import { NavMenu } from "../components/NavMenu";
import "./SiderLayout.less";

const { Header, Sider, Content } = Layout;

type Props = {
  theme: "light" | "dark" | undefined;
  layoutMode: string;
};

export const SiderLayout: React.FC<Props> = props => {
  const { layoutMode, theme } = props;
  const [collapsed, toggleCollapse] = useState(false);
  const [isXs, toggleXs] = useState(false);

  return (
    <Layout className={classnames("layout", "layout-vertical")}>
      <Sider
        className={classnames("layout-sider", {
          "layout-sider--light": theme === "light",
          "layout-sider--dark": theme === "dark"
        })}
        breakpoint={"xs"}
        onBreakpoint={isXs => {
          toggleCollapse(isXs);
          toggleXs(isXs);
        }}
        trigger={null}
        collapsible
        collapsedWidth={isXs ? 0 : 80}
        collapsed={collapsed}
      >
        <Logo h1Style={{ marginLeft: collapsed ? 24 : 12 }} />
        <NavMenu layoutMode={layoutMode} theme={theme} />
      </Sider>
      <Layout className={classnames("layout-content")}>
        <Header>
          <Row>
            <Col xs={4} sm={2}>
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => toggleCollapse(!collapsed)}
              />
            </Col>

            <Col
              xs={20}
              sm={22}
              style={{ textAlign: "right", paddingRight: 12 }}
            >
              <UserInfo />
              <SelectLang />
            </Col>
          </Row>
        </Header>

        <Content>
          <div className="page">
            <main>{props.children}</main>
          </div>
          <DefaultFooter />
        </Content>
      </Layout>
    </Layout>
  );
};
