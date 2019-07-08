import React, { useState } from "react";
import { List, Button, Tag } from "antd";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IArticle } from "../../store/modules/article/article.interface";
import { ArticlePreview } from "../../components/ArticlePreview";
import { useTranslation } from "react-i18next";

type Props = RouteComponentProps & {
  articles: IArticle[];
};

export const BaseComponent = (props: Props) => {
  const { articles, history } = props;
  const { t } = useTranslation();
  const [visible, toggleVisible] = useState(false);

  return (
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={articles}
      renderItem={(article: IArticle) => (
        <List.Item
          key={article.title}
          actions={[
            <Button type="link" onClick={() => toggleVisible(true)}>
              {t("preview")}
            </Button>,
            <Button
              type="link"
              onClick={() => {
                history.push({
                  pathname: "/article/new",
                  state: article
                });
              }}
            >
              {t("edit")}
            </Button>
          ]}
        >
          <List.Item.Meta
            // avatar={<Avatar src={item.avatar} />}
            title={article.title}
            description={article.summary}
          />
          {article.tags
            ? article.tags.map(tag =>
                tag ? (
                  <Tag key={tag.id + "" + tag.label}>{tag.label}</Tag>
                ) : null
              )
            : null}
          <ArticlePreview
            visible={visible}
            article={article}
            onClose={() => toggleVisible(false)}
          />
        </List.Item>
      )}
    />
  );
};

export const ArticleList = withRouter(BaseComponent);
