import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getListManagement } from "../../../apis/database";
import Table from "../../../components/Table";
import { populateData } from "../../../apis/apiUtils";

export async function loader() {
  const data = await getListManagement("center");
  await populateData(data);
  console.log(data);

  return { data };
}

export default function CenterList() {
  const { data } = useLoaderData();
  // console.log(data);
  // const data = {
  //     '0rjlnjz': {
  //         name: "js",
  //         description: '',
  //         techStack: ['-N_DNueEa36ueEz5LTLq', '-N_DNv--S-qUPuzq35O9'],
  //         project: '',
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
      dataField: "description",
      text: "Chức năng, nhiệm vụ",
      isObject: false,
    },
    {
      dataField: "techStack",
      text: "Tech Stack",
      isObject: true,
      objGroup: "category",
    },
    {
      dataField: "project",
      text: "Dự án",
      isObject: true,
      objGroup: "management",
    },
    {
      dataField: "personnel",
      text: "Nhân viên",
      isObject: true,
      objGroup: "management",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="title">Trung tâm, bộ phận, phòng ban</div>
      </div>
      <div className="row justify-content-end">
        <Link
          to="/management/center/create"
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
