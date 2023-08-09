import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getListManagement } from "../../../apis/database";
import Table from "../../../components/Table";
import { populateData } from "../../../apis/apiUtils";

export async function loader() {
  const data = await getListManagement("project");
  await populateData(data);
  // console.log(data);
  return { data };
}

export default function ProjectList() {
  const { data } = useLoaderData();
  // console.log(data);

  // const data = {
  //     '0rjlnjz': {
  //         name: "js",
  //         projectType: '',
  //         projectStatus: '',
  //         techStack: '',
  //         center: '',
  //         personnel: '',
  //     }
  // }

  const columns = [
    {
      dataField: "name",
      text: "Tên",
      isObject: false,
    },
    {
      dataField: "projectType",
      text: "Loại dự án",
      isObject: true,
      objGroup: "category",
    },
    {
      dataField: "projectStatus",
      text: "Trạng thái dự án",
      isObject: true,
      objGroup: "category",
    },
    {
      dataField: "techStack",
      text: "Tech stack",
      isObject: true,
      objGroup: "category",
    },
    {
      dataField: "center",
      text: "Trung tâm phụ trách",
      isObject: true,
      objGroup: "management",
    },
    {
      dataField: "personnel",
      text: "Thành viên",
      isObject: true,
      objGroup: "management",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="title">Dự án</div>
      </div>
      <div className="row justify-content-end">
        <Link
          to={`/management/project/create`}
          type="button"
          className="btn-create btn btn-primary"
        >
          Tạo
        </Link>
      </div>
      <div className="row">
        <Table data={data} columns={columns} />
      </div>
    </div>
  );
}
