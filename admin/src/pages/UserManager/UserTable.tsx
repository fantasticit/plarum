import React, { useState } from "react";
import { Table, Divider, Popconfirm, Tag, Button, Modal, message } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { IUser, IUserState } from "../../store/modules/user/user.interface";
import { UserInfoForm } from "../../components/UserInfoForm";

type Props = {
  loading: boolean;
  fixed?: boolean | "left" | "right";
  render?: Element | React.ReactElement;
  updateUser: Function;
  deleteUser: Function;
};

export const UserTable: React.FC<Props & IUserState> = props => {
  const { users, count, loading, updateUser, deleteUser } = props;
  const [visible, toggleVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { t } = useTranslation();

  const columns: ColumnProps<IUser>[] = [
    {
      title: t("name"),
      width: 100,
      dataIndex: "name",
      key: "name"
    },
    {
      title: t("role"),
      width: 100,
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "magenta" : "cyan"}>{t(role)}</Tag>
      )
    },
    {
      title: t("createAt"),
      dataIndex: "createAt",
      key: "createAt"
    },

    {
      title: t("updateAt"),
      dataIndex: "updateAt",
      key: "updateAt"
    },

    {
      title: t("lastLoginAt"),
      dataIndex: "lastLoginAt",
      key: "lastLoginAt"
    },

    {
      title: t("actions"),
      key: "operation",
      render: (user: IUser) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentUser(user);
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
            onConfirm={() => deleteUser(user.id)}
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
        dataSource={users}
        rowKey={"id"}
        pagination={{
          defaultPageSize: 10,
          total: count,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ["10", "20", "30"]
        }}
      />

      <Modal
        title={t("updateUser")}
        visible={visible}
        footer={null}
        onCancel={() => toggleVisible(false)}
      >
        <UserInfoForm
          {...currentUser}
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
            updateUser(currentUser, values)
              .then(() => {
                message.success(t("updateSuccessMsg"));
              })
              .catch(() => {
                message.error(t("updateFailMsg"));
              });
          }}
        />
      </Modal>
    </>
  );
};
