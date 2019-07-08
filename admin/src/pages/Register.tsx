import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserLayout } from "../layouts/UserLayout";
import { UserInfoForm } from "../components/UserInfoForm";
import { IState } from "../store";
import { register } from "../store/modules/user/user.action";

type StateProps = {
  loading: boolean;
};

type DispatchProps = {
  register: Function;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

const mapStateToProps = (state: IState): StateProps => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>): DispatchProps =>
  bindActionCreators({ register }, dispath);

export const BaseComponent = (props: Props) => {
  const { t } = useTranslation();
  const { loading, register, history } = props;

  return (
    <UserLayout>
      <div
        style={{
          width: "96%",
          maxWidth: 368
        }}
      >
        <h2>{t("register")}</h2>
        <UserInfoForm
          showUserNameField
          showPasswordField
          renderFooter={({ hasErrors, getFieldsError }) => (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                style={{ width: "100%" }}
                loading={loading}
              >
                {t("register")}
              </Button>
              Or <Link to="/login">{t("login")}</Link>
            </Form.Item>
          )}
          onSubmit={(values: any) => {
            register(values).then(() => {
              Modal.confirm({
                title: t("registerSuccessMsg"),
                content: t("registerSuccessHelpMsg"),
                onOk() {
                  history.replace({ pathname: "/login" });
                },
                okText: t("confirm"),
                cancelText: t("cancel")
              });
            });
          }}
        />
      </div>
    </UserLayout>
  );
};

export const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BaseComponent));
