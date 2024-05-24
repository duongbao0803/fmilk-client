import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { FilterOutlined, UserAddOutlined } from "@ant-design/icons";
import { formatDate } from "@/util/validate";
import AddModal from "../user/AddModal";
import useProductService from "@/services/productService";
import ExportButton from "./ExportButton";
import DropdownFunction from "./DropdownFunction";

export interface DataType {
  _id: string;
  key: string;
  name: string;
  image: string;
  description: string;
  quantity: number;
  typeOfProduct: string;
  price: number;
  rating: number;
}

const ProductList: React.FC = () => {
  const { products, isFetching } = useProductService();

  const [isShow, setIsShow] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      className: "first-column",
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "15%",
      render: (image) => (
        <img
          src={image}
          alt="Avatar"
          className="h-[100px] w-[100px] rounded-[100%] object-cover"
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "27%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "5%",
    },
    {
      title: "Type",
      dataIndex: "typeOfProduct",
      width: "13%",
    },

    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: "5%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownFunction productInfo={record} />
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
          <div>
            <ExportButton />
          </div>
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
        dataSource={products?.map(
          (record: { id: unknown; dob: string | number | Date }) => ({
            ...record,
            key: record.id,
            dob: formatDate(record.dob),
          }),
        )}
        pagination={{
          current: currentPage,
          total: products.totalProducts || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddModal setIsShow={setIsShow} isShow={isShow} />
    </>
  );
};

export default ProductList;
