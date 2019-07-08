import React from "react";
import { Button, Typography } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  title?: string | number;
  subTitle?: string;
  children?: React.ReactNode;
} & RouteComponentProps;

export const BaseComponent: React.FC<Props> = (props: Props) => {
  const { title, subTitle, children, history } = props;
  const { t } = useTranslation();

  return (
    <div className="result">
      <div className="result-image">{children}</div>
      <Typography.Title>{title}</Typography.Title>
      <Typography.Paragraph>{subTitle}</Typography.Paragraph>
      <div className="result-extra">
        <Button type="primary" onClick={() => history.replace("/")}>
          {t("backHome")}
        </Button>
      </div>
    </div>
  );
};

export const Result = withRouter(BaseComponent);
