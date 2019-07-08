import * as React from "react";
import classnames from "classnames";
import { DefaultFooter } from "../components/DefaultFooter";
import { SelectLang } from "../components/SelectLang";
import "./UserLayout.less";

export const UserLayout: React.FC = props => {
  return (
    <div className={classnames("user-container")}>
      <div className={classnames("user-lang")}>
        <SelectLang />
      </div>
      <div className={classnames("user-content")}>{props.children}</div>
      <DefaultFooter />
    </div>
  );
};
