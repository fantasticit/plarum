import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LayoutSetting } from "./components/LayoutSetting";
import { SiderLayout } from "./layouts/SiderLayout";
import { TopLayout } from "./layouts/TopLayout";
import { Router } from "./router";

declare let less: any;

const App: React.FC<RouteComponentProps> = props => {
  const { history } = props;
  const pathname = history.location.pathname;
  const isLoginOrRegister = /login|register/.test(pathname);

  // 整体布局模式
  const [layoutMode, setLayoutMode$0] = useState(
    window.localStorage.getItem("layoutMode") || "sider"
  );
  const setLayoutMode = (mode: string) => {
    window.localStorage.setItem("layoutMode", mode);
    setLayoutMode$0(mode);
  };

  // 导航菜单主题
  const [theme, setTheme$0]: [
    "light" | "dark" | undefined,
    Function
  ] = useState(
    window.localStorage.getItem("theme") === "light" ? "light" : "dark"
  );
  const setTheme = (theme: string) => {
    window.localStorage.setItem("theme", theme);
    setTheme$0(theme);
  };

  useEffect(() => {
    let color = window.localStorage.getItem("currentColor");
    if (color) {
      let vars = {
        "@primary-color": color,
        "@btn-primary-bg": color
      };
      less.modifyVars(vars).catch(() => {});
    }
  }, []);

  return (
    <>
      {isLoginOrRegister ? (
        <Router />
      ) : (
        <>
          <LayoutSetting
            theme={theme}
            onThemeChange={setTheme}
            layoutMode={layoutMode}
            onLayoutModeChange={setLayoutMode}
          />
          {layoutMode === "sider" ? (
            <SiderLayout theme={theme} layoutMode={layoutMode}>
              <Router />
            </SiderLayout>
          ) : (
            <TopLayout theme={theme} layoutMode={layoutMode}>
              <Router />
            </TopLayout>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(App);
