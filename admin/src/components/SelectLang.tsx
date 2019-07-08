import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Menu, Dropdown } from "antd";
import classnames from "classnames";

import AmericaLogo from "../assets/america.svg";
import ChinaLogo from "../assets/china.svg";

interface ILanguage {
  key: string;
  name: string;
  logo?: any;
}

const languages: ILanguage[] = [
  { key: "zhCN", name: "简体中文", logo: ChinaLogo },
  { key: "en", name: "English", logo: AmericaLogo }
];

export const SelectLang = () => {
  const { i18n } = useTranslation();
  let [currentLanguage, changeCurrentLanguage] = useState(languages[0]);

  const changeLanguage = (lng: ILanguage) => {
    i18n.changeLanguage(lng.key);
    changeCurrentLanguage(lng);
  };

  const menu = () => {
    return (
      <Menu>
        {languages.map((lng: ILanguage) => (
          <Menu.Item
            key={lng.key}
            className={classnames({
              "ant-dropdown-menu-item-selected": lng.key === currentLanguage.key
            })}
            onClick={() => changeLanguage(lng)}
          >
            <Avatar size={"small"} src={lng.logo} /> {lng.name}
          </Menu.Item>
        ))}
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
        <Avatar src={currentLanguage.logo} size={"small"} />
      </div>
    </Dropdown>
  );
};
