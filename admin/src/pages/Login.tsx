import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { message, Form, Input, Button, Icon } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";
import { UserLayout } from "../layouts/UserLayout";
import { IState } from "../store";
import { login } from "../store/modules/user/user.action";

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
}

interface IProps extends FormComponentProps {
  loading: boolean;
  login: Function;
}

const LoginForm = (props: IProps & RouteComponentProps) => {
  const { t } = useTranslation();
  const { form, login, loading, history } = props;
  const { getFieldDecorator, getFieldsError } = form;

  const validateUsername = (rule: any, value: string, callback: Function) => {
    if (value && value.length >= 4 && value.length <= 16) {
      callback();
    } else {
      callback(t("usernameValidateInfo"));
    }
  };

  const validatePassword = (rule: any, value: string, callback: Function) => {
    if (value && value.length >= 6) {
      callback();
    } else {
      callback(t("passwordValidateInfo"));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then((res: { token: string }) => {
          window.sessionStorage.setItem("token", res["token"]);
          message.success(t("loginSuccessMsg"));
          history.replace({ pathname: "/" });
        });
      }
    });
  };

  return (
    <UserLayout>
      <div
        style={{
          width: "96%",
          maxWidth: 368
        }}
      >
        <h2>{t("login")}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ validator: validateUsername }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={t("usernameValidateInfo")}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ validator: validatePassword }]
            })(
              <Input.Password
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder={t("password")}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              style={{ width: "100%" }}
              loading={loading}
            >
              {t("login")}
            </Button>
            Or <Link to="/register">{t("register")}</Link>
          </Form.Item>
        </Form>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "login" })(withRouter(LoginForm)));
