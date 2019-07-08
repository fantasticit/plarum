import React, { useState } from "react";
import { Table, Divider, Popconfirm, Button, Modal, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { ITag, ITagState } from "../../store/modules/tag/tag.interface";
import { TagForm } from "./TagForm";

type Props = {
  loading: boolean;
  fixed?: boolean | "left" | "right";
  render?: Element | React.ReactElement;
  updateTag: Function;
  deleteTag: Function;
} & ITagState;

export const TagTable: React.FC<Props> = props => {
  const { tags, loading, updateTag, deleteTag } = props;
  const [visible, toggleVisible] = useState(false);
  const [currentTag, setCurrentTag] = useState({});
  const { t } = useTranslation();

  const columns: ColumnProps<ITag>[] = [
    {
      title: t("tagLabel"),
      width: 100,
      dataIndex: "label",
      key: "label"
    },
    {
      title: t("tagValue"),
      width: 100,
      dataIndex: "value",
      key: "value"
    },
    {
      title: t("actions"),
      key: "operation",
      render: (tag: ITag) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentTag(tag);
              toggleVisible(true);
            }}
          >
            {t("edit")}
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title={t("areYouSure")}
            okText={t("confirm")}
            cancelText={t("cancel")}
            onConfirm={async () => {
              await deleteTag(tag.id);
            }}
          >
            <Button type="link">{t("delete")}</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <>
      <Table
        style={{ backgroundColor: "#fff" }}
        columns={columns}
        dataSource={tags}
        rowKey={"id"}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "30"]
        }}
      />

      <Modal
        title={t("updateTag")}
        visible={visible}
        footer={null}
        onCancel={() => toggleVisible(false)}
      >
        <TagForm
          {...currentTag}
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
            updateTag(currentTag, values)
              .then(() => {
                message.success(t("updateTagSuccessMsg"));
              })
              .catch(() => {
                message.error(t("updateTagFailMsg"));
              });
          }}
        />
      </Modal>
    </>
  );
};
