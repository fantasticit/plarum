import React from "react";
import { Form, Input, Icon, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { useTranslation } from "react-i18next";

type Props = {
  name?: string;
  role?: string;
  showUserNameField?: boolean;
  showPasswordField?: boolean;
  showUserRoleField?: boolean;
  onSubmit: Function;
  renderFooter?: (arg: {
    getFieldsError: Function;
    hasErrors: Function;
  }) => React.ReactElement;
};

const BaseComponent: React.FC<Props & FormComponentProps> = (
  props: Props & FormComponentProps
) => {
  const { t } = useTranslation();
  const {
    form,
    name,
    role,
    renderFooter,
    showUserNameField,
    showPasswordField,
    showUserRoleField,
    onSubmit
  } = props;
  const { getFieldDecorator, getFieldsError } = form;

  function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some((field: any) => fieldsError[field]);
  }

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

  const compareToFirstPassword = (
    rule: any,
    value: string,
    callback: Function
  ) => {
    if (value && value === form.getFieldValue("password")) {
      callback();
    } else {
      callback(t("twoPasswordNotEqual"));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
        // resetFields();
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showUserNameField ? (
        <Form.Item>
          {getFieldDecorator(
            "name",
            Object.assign(
              {
                rules: [{ validator: validateUsername }]
              },
              name ? { initialValue: role } : {}
            )
          )(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder={t("username")}
            />
          )}
        </Form.Item>
      ) : null}

      {showPasswordField ? (
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ validator: validatePassword }]
          })(
            <Input.Password
              type="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder={t("password")}
            />
          )}
        </Form.Item>
      ) : null}
      {showPasswordField ? (
        <Form.Item>
          {getFieldDecorator("confirm", {
            rules: [{ validator: compareToFirstPassword }]
          })(
            <Input.Password
              type="password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder={t("confirmPassword")}
            />
          )}
        </Form.Item>
      ) : null}
      {showUserRoleField ? (
        <Form.Item>
          {getFieldDecorator("role", role ? { initialValue: role } : {})(
            <Select placeholder={t("assignUserRole")}>
              <Select.Option value="normal">{t("normal")}</Select.Option>
              <Select.Option value="admin">{t("admin")}</Select.Option>
            </Select>
          )}
        </Form.Item>
      ) : null}
      {renderFooter && renderFooter({ getFieldsError, hasErrors })}
    </Form>
  );
};

export const UserInfoForm = Form.create<Props & FormComponentProps>({
  name: "userInfoForm"
})(BaseComponent);
