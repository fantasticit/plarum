import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserInfoForm } from "../../components/UserInfoForm";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Button, Modal, message } from "antd";
import { IState } from "../../store";
import { register } from "../../store/modules/user/user.action";

type StateProps = {
  loading: boolean;
};

type DispatchProps = {
  register: Function;
};

type Props = StateProps &
  DispatchProps & {
    onSuccess: Function;
  };

const mapStateToProps = (state: IState): StateProps => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>): DispatchProps =>
  bindActionCreators({ register }, dispath);

const BaseComponent: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [visible, toggleVisible] = useState(false);
  const { loading, register, onSuccess } = props;

  return (
    <div style={{ margin: "1em 0" }}>
      <Button type="primary" icon="plus" onClick={() => toggleVisible(true)}>
        {t("create")}
      </Button>
      <Modal
        title={t("createUser")}
        visible={visible}
        footer={null}
        onCancel={() => toggleVisible(false)}
      >
        <UserInfoForm
          showUserNameField
          showPasswordField
          showUserRoleField
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
          onSubmit={(values: any) => {
            register(values)
              .then(() => {
                message.success(t("createSuccessMsg"));
                toggleVisible(false);
                onSuccess();
              })
              .catch(() => {
                message.error(t("createFailMsg"));
              });
          }}
        />
      </Modal>
    </div>
  );
};

export const CreateUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseComponent);
