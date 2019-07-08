import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Button, Modal, message } from "antd";
import { IState } from "../../store";
import { addTag } from "../../store/modules/tag/tag.action";
import { TagForm } from "./TagForm";

type StateProps = {
  loading: boolean;
};

type DispatchProps = {
  addTag: Function;
};

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: IState): StateProps => ({
  loading: state.loading.loading
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>): DispatchProps =>
  bindActionCreators({ addTag }, dispath);

const BaseComponent: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [visible, toggleVisible] = useState(false);
  const { loading, addTag } = props;

  return (
    <div style={{ margin: "1em 0" }}>
      <Button type="primary" icon="plus" onClick={() => toggleVisible(true)}>
        {t("create")}
      </Button>
      <Modal
        title={t("createTag")}
        visible={visible}
        footer={null}
        onCancel={() => toggleVisible(false)}
      >
        <TagForm
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
            addTag(values)
              .then(() => {
                message.success(t("createTagSuccessMsg"));
                toggleVisible(false);
              })
              .catch(() => {
                message.error(t("createTagFailMsg"));
              });
          }}
        />
      </Modal>
    </div>
  );
};

export const CreateTag = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseComponent);
