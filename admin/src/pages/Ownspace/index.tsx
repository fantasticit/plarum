import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Tabs } from "antd";
import { connect } from "react-redux";
import { IState } from "../../store";
import { PageHeader } from "../../components/PageHeader";

import { ArticleList } from "./ArticleList";
import { UserInfo } from "./UserInfo";

const mapStateToProps = (state: IState) => ({
  currentUser: state.user.currentUser
});

type Props = ReturnType<typeof mapStateToProps>;

const BaseComponent = (props: Props) => {
  const { t } = useTranslation();
  const { currentUser } = props;

  return (
    <>
      <PageHeader title={t("ownspace")} />
      <div>
        <Row gutter={16}>
          <Col sm={6}>
            <div style={{ background: "#fff", padding: 15 }}>
              <UserInfo user={currentUser} />
            </div>
          </Col>
          <Col sm={18} style={{ background: "#fff", padding: 15 }}>
            <div style={{ background: "#fff", padding: 15 }}>
              <Tabs>
                <Tabs.TabPane tab={t("article")} key={"article"}>
                  <ArticleList
                    articles={(currentUser && currentUser.articles) || []}
                  />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export const Ownspace = connect(
  mapStateToProps,
  null
)(BaseComponent);
