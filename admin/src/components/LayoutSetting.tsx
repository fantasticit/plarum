import React, { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Divider,
  Icon,
  Switch,
  Typography
} from "antd";
import { useTranslation } from "react-i18next";
import SiderLayoutSvg from "../assets/SiderLayout.svg";
import TopLayoutSvg from "../assets/TopLayout.svg";
import { ThemeColor } from "./ThemeColor";

type Props = {
  layoutMode: string;
  onLayoutModeChange: Function;
  theme: "light" | "dark" | undefined;
  onThemeChange: Function;
};

type LayoutModeCheckIconProps = {
  cover: string;
  currentLayoutMode: string;
  layoutMode: string;
  onLayoutModeChange: Function;
};

const LayoutModeCheckIcon: React.FC<LayoutModeCheckIconProps> = (
  props: LayoutModeCheckIconProps
) => {
  const { layoutMode, cover, currentLayoutMode, onLayoutModeChange } = props;
  return (
    <div
      className={"block-checkbox-item"}
      onClick={() => onLayoutModeChange(layoutMode)}
    >
      <Avatar shape="square" size={"large"} src={cover} icon="check" />
      {layoutMode === currentLayoutMode ? <Icon type="check" /> : null}
    </div>
  );
};

export const LayoutSetting: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [visible, toggleVisible] = useState(false);
  const { layoutMode, onLayoutModeChange, theme, onThemeChange } = props;
  const width = 300;

  return (
    <>
      <Drawer
        title={null}
        placement="right"
        closable={true}
        onClose={() => toggleVisible(false)}
        visible={visible}
        width={width}
        handler={
          <Button
            type="primary"
            icon={visible ? "close" : "setting"}
            className="setting-drawer-handler"
            onClick={() => toggleVisible(!visible)}
          />
        }
      >
        <Typography.Paragraph>{t("layoutMode")}</Typography.Paragraph>
        <div>
          <LayoutModeCheckIcon
            cover={SiderLayoutSvg}
            layoutMode="sider"
            currentLayoutMode={layoutMode}
            onLayoutModeChange={onLayoutModeChange}
          />
          <LayoutModeCheckIcon
            cover={TopLayoutSvg}
            layoutMode="top"
            currentLayoutMode={layoutMode}
            onLayoutModeChange={onLayoutModeChange}
          />
        </div>
        <br />
        <ThemeColor />
        <Divider />
        <Typography.Paragraph
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>{t("navMenuTheme")}</span>
          <Switch
            checkedChildren={t("navMenuThemeLight")}
            unCheckedChildren={t("navMenuThemeDark")}
            checked={theme === "light"}
            onChange={val => {
              onThemeChange(val ? "light" : "dark");
            }}
          />
        </Typography.Paragraph>
      </Drawer>
    </>
  );
};
