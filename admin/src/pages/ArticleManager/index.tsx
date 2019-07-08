import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { IState } from "../../store";
import {
  fetchArticles,
  deleteArticle
} from "../../store/modules/article/article.action";
import { IArticle } from "../../store/modules/article/article.interface";
import { PageHeader } from "../../components/PageHeader";
import { ArticleTable } from "./ArticleTable";

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading,
  articles: state.article.articles
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchArticles, deleteArticle }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps & {
    fetchUsers: Function;
    articles?: IArticle[];
  };

const BaseComponent: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { articles, loading, fetchArticles, history, deleteArticle } = props;

  useEffect(() => {
    fetchArticles();
    return () => {};
  }, [fetchArticles]);

  return (
    <>
      <PageHeader title={t("articleList")} />
      <div style={{ background: "#fff", padding: 15 }}>
        <Button
          type="primary"
          icon="plus"
          style={{ margin: "1em 0" }}
          onClick={() => history.push("/article/new")}
        >
          {t("create")}
        </Button>
        <ArticleTable
          loading={loading}
          articles={articles}
          updateArticle={(article: IArticle) => {
            history.push({
              pathname: "/article/new",
              state: article
            });
          }}
          deleteArticle={deleteArticle}
        />
      </div>
    </>
  );
};

export const ArticleManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BaseComponent));
