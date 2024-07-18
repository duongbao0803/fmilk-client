import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import AddBrandModal from "./AddBrandModal";
import DropdownBrandFunc from "./DropdownBrandFunc";
import useBrandService from "@/services/brandService";
import { formatDate } from "@/util/validate";

export interface DataType {
  _id: string;
  brandName: string;
}

const BrandList: React.FC = () => {
  const { brands, isFetching, totalCount } = useBrandService();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      render: (_, _record, index) => index + 1,
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      width: "25%",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      width: "25%",
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      width: "25%",
    },
    {
      title: "Update date",
      dataIndex: "updatedAt",
      width: "25%",
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          <DropdownBrandFunc brandInfo={record} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2"></div>
        <div className="flex gap-x-2">
          <div>
            <Button type="primary" onClick={() => setIsOpen(true)}>
              <div className="flex justify-center">+ Add brand</div>
            </Button>
          </div>
        </div>
      </div>
      <Table
        className="pagination"
        id="myTable"
        columns={columns}
        dataSource={brands?.map(
          (record: { id: unknown; createdAt: Date; updatedAt: Date }) => ({
            ...record,
            key: record.id,
            updatedAt: formatDate(record.updatedAt),
            createdAt: formatDate(record.createdAt),
          }),
        )}
        pagination={{
          current: currentPage,
          total: totalCount || 0,
          pageSize: 5,
        }}
        onChange={handleTableChange}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
      <AddBrandModal setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default BrandList;
