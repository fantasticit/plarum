import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IState } from "../../store";
import {
  addArticle,
  updateArticle
} from "../../store/modules/article/article.action";
import { IArticle } from "../../store/modules/article/article.interface";
import { Row, Col, Input, Icon, Button, Drawer, message } from "antd";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../../components/PageHeader";
import { MDEditor } from "./MDEditor";
import { ArticleStatus } from "./ArticleStatus";
import { TagsSelect } from "./TagsSelect";
import { IUser } from "../../store/modules/user/user.interface";
import { ITag } from "../../store/modules/tag/tag.interface";

const { TextArea } = Input;

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ addArticle, updateArticle }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps & {
    addArticle: Function;
    updateArticle: Function;
  };

const CREATE_ARTICLE = "CREATE_ARTICLE";
const UPDATE_ARTICLE = "UPDATE_ARTICLE";

const isValid = (val: string | Array<any> | IUser | undefined) =>
  val && (typeof val === "string" || Array.isArray(val) ? val.length : val);

const BaseComponent: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { history, loading, addArticle, updateArticle } = props;
  const oldArticle = history.location.state;
  if (oldArticle && oldArticle.tags && oldArticle.tags.length) {
    oldArticle.tags = oldArticle.tags.map(
      (tag: ITag) => (tag && tag.id) || null
    );
  }
  const mode = oldArticle && oldArticle.id ? UPDATE_ARTICLE : CREATE_ARTICLE;

  const [visible, toggleVisible] = useState(false);
  const [title, setTitle] = useState((oldArticle && oldArticle.title) || "");
  const [summary, setSummary] = useState(
    (oldArticle && oldArticle.summary) || ""
  );
  const [content, setContent] = useState(
    (oldArticle && oldArticle.content) || ""
  );
  const [tags, setTags] = useState(
    (oldArticle &&
      oldArticle.tags &&
      oldArticle.tags.length && [...oldArticle.tags]) ||
      []
  );
  const [status, setStatus] = useState((oldArticle && oldArticle.status) || "");

  const onSubmit = async () => {
    const article: IArticle = {};
    const validatorGenerator = function*() {
      yield (article.title = title);
      yield (article.summary = summary);
      yield (article.content = content);
      yield (article.tags = tags);
      yield (article.status = status);
    };
    const validator = validatorGenerator();
    validator.next();
    const check = (key: keyof IArticle) => {
      if (key && isValid(article[key])) {
        validator.next();
        return true;
      } else {
        message.error(
          t(
            `article${key.slice(0, 1).toUpperCase() + key.slice(1)}MissingError`
          )
        );
        return false;
      }
    };
    const keys: Array<keyof IArticle> = [
      "title",
      "summary",
      "content",
      "tags",
      "status"
    ];
    let isOk: boolean = false;
    for (let key of keys) {
      if (!(isOk = check(key))) {
        break;
      }
    }

    if (isOk) {
      if (mode === CREATE_ARTICLE) {
        try {
          await addArticle(article);
          message.success(t("createArticleSuccessMsg"));
        } catch (e) {
          message.error(t("createArticleFailMsg"));
        }
      } else {
        try {
          await updateArticle(oldArticle, article);
          message.success(t("updateArticleSuccessMsg"));
        } catch (e) {
          message.error(t("updateArticleFailMsg"));
        }
      }
    }
  };

  return (
    <>
      <PageHeader title={t("articleEditor")} />
      <div style={{ background: "#fff", padding: 15 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Input
              placeholder={t("articleTitle")}
              defaultValue={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div style={{ margin: "24px 0" }} />
            <TextArea
              placeholder={t("articleSummary")}
              defaultValue={summary}
              autosize={{ minRows: 2, maxRows: 6 }}
              onChange={e => setSummary(e.target.value)}
            />
            <div style={{ margin: "24px 0" }} />
            <MDEditor value={content} onChange={setContent} />
          </Col>
        </Row>

        <Button type="primary" onClick={() => toggleVisible(true)}>
          <Icon type="plus" /> {t("submit")}
        </Button>
        <Drawer
          title={t("createArticle")}
          width={360}
          visible={visible}
          closable
          onClose={() => toggleVisible(false)}
        >
          <div>
            <TagsSelect value={tags} onChange={(val: any) => setTags(val)} />
            {/* <CoverUpload /> */}
            <ArticleStatus
              value={status}
              onChange={(val: any) => setStatus(val)}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button
              style={{ marginRight: 8 }}
              onClick={() => toggleVisible(false)}
            >
              {t("cancel")}
            </Button>
            <Button type="primary" onClick={onSubmit} loading={loading}>
              {t("submit")}
            </Button>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export const ArticleEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BaseComponent));
