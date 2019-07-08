import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useTranslation } from "react-i18next";
import { IState } from "../../store";
import { fetchTags } from "../../store/modules/tag/tag.action";

const CheckboxGroup = Checkbox.Group;

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading,
  tags: state.tag.tags
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchTags }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    value?: CheckboxValueType[];
    onChange?: (checkedValue: CheckboxValueType[]) => void;
  };

const BaseComponent: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const { tags, value, fetchTags, onChange = () => {} } = props;

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <div style={{ paddingBottom: 20 }}>
      <h3>{t("articleTags")}</h3>
      <CheckboxGroup
        options={tags && tags.map(tag => ({ label: tag.label, value: tag.id }))}
        style={{ marginBottom: 15 }}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TagsSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseComponent);
