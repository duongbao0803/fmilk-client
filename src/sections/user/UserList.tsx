import React, { useState } from "react";
import { Button, Input, Switch, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {
  EditOutlined,
  FilterOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import useUserService from "@/services/userService";
import EditModal from "./EditModal";
import { UserInfo } from "@/interfaces/interface";
import { formatDate } from "@/util/validate";
import AddModal from "./AddModal";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  status: boolean;
}

const UserList: React.FC = () => {
  const { users, isFetching, updateStatus } = useUserService();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const openEditModal = (userData: UserInfo) => {
    setIsOpen(true);
    setUserInfo(userData);
  };

  const handleStatusChange = async (userId: string, newStatus: boolean) => {
    if (userId) {
      updateStatus(userId, newStatus);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      className: "first-column",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      width: "15%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "10%",
      filters: [
        { text: "ADMIN", value: "ADMIN" },
        { text: "STAFF", value: "STAFF" },
        { text: "MEMBER", value: "MEMBER" },
        { text: "GUEST", value: "GUEST" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        let color;
        switch (role) {
          case "ADMIN":
            color = "blue";
            break;
          case "STAFF":
            color = "green";
            break;
          case "MEMBER":
            color = "red";
            break;
          case "GUEST":
            color = "orange";
            break;
        }
        return (
          <Tag color={color} key={role}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (_, record) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={record.status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
        />
      ),
    },

    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <EditOutlined onClick={() => openEditModal(record)} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <Input
            placeholder="Search by..."
            className="h-8 max-w-lg rounded-lg sm:mb-5 sm:w-[300px]"
          />
          <Button className="flex items-center" type="primary">
            <FilterOutlined className="align-middle" />
            Sort
          </Button>
        </div>
        <div className="flex gap-x-2">
          <div>{/* <ExportButton /> */}</div>
          <div>
            <Button type="primary" onClick={() => setIsShow(true)}>
              <div className="flex justify-center">
                <UserAddOutlined className="mr-1 text-lg" /> Add User
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={users.map(
          (record: { id: unknown; dob: string | number | Date }) => ({
            ...record,
            key: record.id,
            dob: formatDate(record.dob),
          }),
        )}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddModal setIsShow={setIsShow} isShow={isShow} />
      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} userInfo={userInfo} />
    </>
  );
};

export default UserList;
