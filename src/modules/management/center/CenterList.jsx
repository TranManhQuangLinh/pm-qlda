import React from "react";
import {
  Link,
  useLoaderData,
} from "react-router-dom";
import { getCategory, getListManagement, getManagement } from "../../../database";
import Table from "../../../components/Table";

export async function loader() {
  const data = await getListManagement("center");

  // get techStack object from list id
  await Promise.all(
    Object.entries(data).map(async ([, item]) => {
      if (item.techStack && Array.isArray(item.techStack)) {
        item.techStack = await Promise.all(
          item.techStack.map(async (i) => {
            const obj = await getCategory(i, 'techStack')
            return {
              id: i,
              name: obj.name,
            }
          }),
        );
      } else {
        item.techStack = []; // Provide a default empty array
      }
      return item;
    }),
  );

  // get personnel object from list id
  await Promise.all(
    Object.entries(data).map(async ([, item]) => {
      if (item.personnel && Array.isArray(item.personnel)) {
        item.personnel = await Promise.all(
          item.personnel.map(async (i) => {
            const obj = await getManagement(i, 'personnel')
            return {
              id: i,
              name: obj.name,
            }
          }),
        );
      } else {
        item.personnel = []; // Provide a default empty array
      }
      return item;
    }),
  );

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
