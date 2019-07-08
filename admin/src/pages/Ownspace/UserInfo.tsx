import React, { useState } from "react";
import { message, Button, Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { useTranslation } from "react-i18next";
import { UserInfoForm } from "../../components/UserInfoForm";
import { IState } from "../../store";
import { updateCurrentUser } from "../../store/modules/user/user.action";
import { IUser } from "../../store/modules/user/user.interface";

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ updateCurrentUser }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    user: IUser | undefined;
  };

export const BaseComponent = (props: Props) => {
  const { t } = useTranslation();
  const { loading, user, updateCurrentUser } = props;
  const [visible, toggleVisible] = useState(false);

  return (
    <>
      <h3>{t("userInfo")}</h3>
      <div>
        <span>{t("name")}: </span>
        <span style={{ marginLeft: 15 }}>{user && user.name}</span>
      </div>

      <Divider dashed />

      <div>
        <span>{t("password")}: </span>
        {!visible ? (
          <Button
            style={{ marginLeft: 15 }}
            onClick={() => toggleVisible(true)}
          >
            {t("changePassword")}
          </Button>
        ) : (
          <UserInfoForm
            {...user}
            showPasswordField
            renderFooter={({ hasErrors, getFieldsError }) => (
              <div style={{ textAlign: "right" }}>
                <Button
                  htmlType="reset"
                  style={{ marginRight: 8 }}
                  onClick={() => toggleVisible(false)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                  loading={loading}
                >
                  {t("confirm")}
                </Button>
              </div>
            )}
            onSubmit={async (values: any) => {
              if (user) {
                try {
                  await updateCurrentUser(user, values);
                  message.success(t("updateSuccessMsg"));
                  toggleVisible(false);
                } catch (e) {
                  message.error(t("updateFailMsg"));
                }
              }
            }}
          />
        )}
      </div>

      <Divider dashed />

      <div>
        <span>{t("role")}: </span>
        <span style={{ marginLeft: 15 }}>{user && user.role}</span>
      </div>
    </>
  );
};
export const UserInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseComponent);
