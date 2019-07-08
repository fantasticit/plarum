import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

let globalHistory: any = null;
let translate: any;

const BaseComponent: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const { t } = useTranslation();
  const { history } = props;
  globalHistory = history;
  translate = t;
  return null;
};

export const History = withRouter(BaseComponent);

export const getHistory = () => globalHistory;
export const getTranslate = () => translate;
