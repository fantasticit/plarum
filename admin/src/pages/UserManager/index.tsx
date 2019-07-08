import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { useTranslation } from "react-i18next";
import { IState } from "../../store";
import {
  fetchUsers,
  updateUser,
  deleteUser
} from "../../store/modules/user/user.action";
import { IUser } from "../../store/modules/user/user.interface";
import { PageHeader } from "../../components/PageHeader";
import { CreateUser } from "./CreateUser";
import { UserTable } from "./UserTable";

const mapStateToProps = (state: IState) => ({
  loading: state.loading.loading,
  users: state.user.users,
  count: state.user.count
});

const mapDispatchToProps = (dispath: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchUsers, updateUser, deleteUser }, dispath);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    fetchUsers: Function;
    users?: IUser[];
    count?: number;
  };

const UsersComponent: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { users, count, loading, fetchUsers, updateUser, deleteUser } = props;

  useEffect(() => {
    fetchUsers();

    return () => {};
  }, [fetchUsers]);

  return (
    <>
      <PageHeader title={t("userManager")} />
      <div style={{ background: "#fff", padding: 15 }}>
        <CreateUser onSuccess={() => fetchUsers()} />
        <UserTable
          loading={loading}
          users={users}
          count={count}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export const UserManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersComponent);
