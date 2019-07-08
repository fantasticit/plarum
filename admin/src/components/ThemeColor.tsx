import React, { useState } from "react";
import { Avatar, message, Typography } from "antd";
import { useTranslation } from "react-i18next";

declare let less: any;

const colors = [
  "rgb(24, 144, 255)",
  "rgb(245, 34, 45)",
  "rgb(250, 84, 28)",
  "rgb(250, 173, 20)",
  "rgb(19, 194, 194)",
  "rgb(82, 196, 26)",
  "rgb(47, 84, 235)"
];

const changeColor = (
  color: string,
  compilingMsg: string,
  failedMsg: string
): Promise<any> => {
  const hide = message.loading(compilingMsg, 0);
  let vars = {
    "@primary-color": color,
    "@btn-primary-bg": color
  };
  return less
    .modifyVars(vars)
    .then(() => {
      window.localStorage.setItem("currentColor", color);
      return Promise.resolve();
    })
    .catch((error: any) => {
      message.error(failedMsg);
      return Promise.reject();
    })
    .finally(hide);
};

export const ThemeColor: React.FC = () => {
  const { t } = useTranslation();
  const [currentColor, setCurrentColor] = useState(
    window.localStorage.getItem("currentColor") || colors[0]
  );
  const compilingMsg = t("compilingTheme");
  const failedMsg = t("compileThemeFailed");

  return (
    <>
      <Typography.Paragraph>{t("themeColor")}</Typography.Paragraph>
      <div>
        {colors.map((color, i) => (
          <div
            style={{ display: "inline-block" }}
            key={color}
            onClick={() => {
              changeColor(color, compilingMsg, failedMsg).then(() => {
                setCurrentColor(color);
              });
            }}
          >
            <Avatar
              style={{ marginLeft: i > 0 ? 8 : 0, background: color }}
              shape="square"
              size={"small"}
              icon={currentColor === color ? "check" : undefined}
            />
          </div>
        ))}
      </div>
    </>
  );
};
