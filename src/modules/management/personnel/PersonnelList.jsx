import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getCategory, getListManagement } from "../../../database";
import Table from "../../../components/Table";

export async function loader() {
  const data = await getListManagement("personnel");

  // get techStack object from list object
  async function getTechStackObjects(techStackList) {
    try {
      const techStackObjects = await Promise.all(
        techStackList.map(async (techStack) => {
          const techStackObject = await getCategory(techStack.id, "techStack");
          return {
            name: techStackObject.name,
            id: techStack.id,
          };
        })
      );
      return techStackObjects;
    } catch (error) {
      console.error("Error fetching techStack objects:", error);
      return [];
    }
  }
  // When you use await inside the map loop, it essentially makes the loop an asynchronous function, and all the iterations of the loop will be executed asynchronously. This means that the obj.techStack may not be fully populated with the resolved promises from getTechStackObjects when the useLoaderData() hook is called.
  // You can use Promise.all to wait for all the promises to resolve before rendering the component.
  await Promise.all(
    Object.values(data).map(async (obj) => {
      if (obj.techStack && Array.isArray(obj.techStack)) {
        obj.techStack = await getTechStackObjects(obj.techStack);
      } else {
        obj.techStack = []; // Provide a default empty array
      }
      return obj;
    })
  );

  // console.log(data);
  return { data };
}

export default function PersonnelList() {
  const { data } = useLoaderData();
  // console.log(data);
  // const data = {
  //   "0rjlnjz": {
  //     name: "js",
  //     birthday: "",
  //     phone: "",
  //     description: "",
  //     techStack: ["-N_DNueEa36ueEz5LTLq", "-N_DNv--S-qUPuzq35O9"],
  //     project: "",
  //   },
  // };

  const columns = [
    {
      dataField: "name",
      text: "Họ tên",
      isObject: false,
    },
    {
      dataField: "dateOfBirth",
      text: "Ngày sinh",
      isObject: false,
    },
    {
      dataField: "phone",
      text: "Số điện thoại",
      isObject: false,
    },
    {
      dataField: "techStack",
      text: "Tech Stack",
      isObject: true,
      objGroup: "category",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        <div className="title">Nhân sự</div>
      </div>
      <div className="row justify-content-end">
        <Link
          to={`/management/personnel/create`}
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
