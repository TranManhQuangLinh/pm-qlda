import React from "react";
import Table from "../../components/Table";
import { Link, useLoaderData } from "react-router-dom";
import { getListCategory } from "../../database";

export async function loader({ params }) {
  const objName = params.objName;
  // console.log(objName);
  const data = await getListCategory(objName ? objName : "projectType");
  // console.log(data);
  return { data, objName };
}

export default function CategoryList() {
  const { data, objName } = useLoaderData();
  let title;
  switch (objName) {
    case "projectType":
      title = "Loại dự án";
      break;
    case "projectStatus":
      title = "Trạng thái dự án";
      break;
    case "techStack":
      title = "Tech Stack";
      break;
    case "customerGroup":
      title = "Nhóm khách hàng";
      break;
    default:
      title = "Loại dự án";
      break;
  }
  // const data = {
  //     '0rjlnjz': {
  //         description: "",
  //         name: "js",
  //         status: "inactive",
  //         weight: "1"
  //     },
  //     '4r0vt4b':
  //     {
  //         description: "asd",
  //         name: "js",
  //         status: "active",
  //         weight: "1"
  //     }
  // }

  // const newData = { ...data };

  // for (let i = 0; i < 100; i++) {
  //     const id = Math.random().toString(36).substring(2, 9);
  //     newData[id] = {
  //         description: `Description ${i + 1}`,
  //         name: `Project ${i + 1}`,
  //         status: i % 2 === 0 ? "active" : "inactive",
  //         weight: `${i + 1}`
  //     };
  // }

  const columns = [
    {
      dataField: "name",
      text: "Tên",
      isObject: false,
    },
    {
      dataField: "description",
      text: "Mô tả",
      isObject: false,
    },
  ];

  if (!objName || objName === "projectType" || objName === "customerGroup") {
    columns.push({
      dataField: "weight",
      text: "Ưu tiên",
      isObject: false,
    });
  }

  columns.push({
    dataField: "status",
    text: "Trạng thái",
    isObject: false,
  });

  return (
    <div className="container">
      <div className="row">
        <div className="title">{title}</div>
      </div>
      <div className="row justify-content-end">
        <Link
          to={`/category/${objName ? objName : "projectType"}/create`}
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
